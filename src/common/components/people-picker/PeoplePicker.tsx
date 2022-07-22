import * as React from 'react';
import { IPersonaProps, IPersonaStyles } from '@fluentui/react/lib/Persona';
import {
    IBasePickerSuggestionsProps,
    ListPeoplePicker,
    ValidationState,
    PeoplePickerItemSuggestion,
    CompactPeoplePicker,
    NormalPeoplePicker,
    IPeoplePickerItemSelectedProps,
    PeoplePickerItem,
    IPeoplePickerProps,
    IInputProps,
} from '@fluentui/react/lib/Pickers';
import { getGraphFi, getSP } from '../../config/pnpjs.config';
import { PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { useId } from '@fluentui/react-hooks';
import { getTheme, IRenderFunction, ITextFieldProps, Label, mergeStyles, Text } from '@fluentui/react';
import { renderFieldDescription, renderFieldErrorMessage, renderFieldLabelWithHelp } from '../forms/CustomFormElements';
// import { renderFieldDescription, renderFieldErrorMessage, renderFieldLabel } from '../forms/CustomElements';

interface PeoplePickerProps extends IInputProps {
    label?: string;
    onRenderLabel?: IRenderFunction<ITextFieldProps>;
    peoplePickerType?: "Normal" | "Compact" | "List";
    principalTypes?: PrincipalType[];
    onPeopleSelectChange: (items: IPersonaProps[]) => any;
    defaultSelectedUsers?: IPersonaProps[];
    personSelectionLimit?: number;
    required?: boolean;
    resolveDelay?: number;
    placeholder?: string;
    errorMessage?: string; 
    value?: any[];
    disabled?: boolean;
    description?: string
    onRenderDescription?: IRenderFunction<ITextFieldProps>;
    showSecondaryText?: boolean;
}

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts',
};

const personaStyles: Partial<IPersonaStyles> = {
    root: {
        height: 'auto',
    },
    secondaryText: {
        height: 'auto',
        whiteSpace: 'normal',
    },
    primaryText: {
        height: 'auto',
        whiteSpace: 'normal',
    },
};

export const PeoplePicker: React.FunctionComponent<PeoplePickerProps> = (props) => {
    const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState<IPersonaProps[]>([]);
    const [peopleList, setPeopleList] = React.useState<IPersonaProps[]>([]);
    const [selectedPeople, setSelectedPeople] = React.useState<IPersonaProps[]>([]);

    const picker = React.useRef(null);
    const peoplePickerId = useId('peoplePicker');

    const { principalTypes, peoplePickerType, onPeopleSelectChange } = props;

    const getAllUsers = async () => {

        // try {
        //     const graph = await getGraphFi();

        //     const allUsers = await graph.me.people();
        //     console.log("allUsers")
        //     console.table(allUsers)

        // } catch (error) {
        //     console.log(error)
        // }


        const sp = await getSP();
        const users = await (await sp.web.siteUsers())
            .filter(x => principalTypes?.length == 0
                || principalTypes.indexOf(x.PrincipalType) > -1);
        console.log(users);

        const peoples = users.map(
            user => {
                return ({
                    id: `${user.Id}`,
                    text: user.Title,
                    secondaryText: user.Email,
                    tertiaryText: user.LoginName
                } as IPersonaProps);
            }
        );
        setPeopleList(peoples);

        //setSelectedPeople(peoples.slice(0, 3));
    }

    React.useEffect(() => {
        getAllUsers();
    }, []);

    React.useEffect(() => {
        setSelectedPeople(props?.defaultSelectedUsers);
    }, [props?.defaultSelectedUsers]);

    const onFilterChanged = (
        filterText: string,
        currentPersonas: IPersonaProps[],
        limitResults?: number,
    ): IPersonaProps[] | Promise<IPersonaProps[]> => {
        if (filterText) {
            let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

            filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
            filteredPersonas = limitResults ? filteredPersonas.slice(0, limitResults) : filteredPersonas;
            return filterPromise(filteredPersonas);
        } else {
            return [];
        }
    };

    const filterPersonasByText = (filterText: string): IPersonaProps[] => {
        return peopleList.filter(item => doesTextContainsName(item.text as string, filterText)
            || doesTextContainsName(item.secondaryText as string, filterText));
    };

    const filterPromise = (personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
        if (props?.resolveDelay) {
            return convertResultsToPromise(personasToReturn);
        } else {
            return personasToReturn;
        }
    };

    const returnMostRecentlyUsed = (currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
        return filterPromise(removeDuplicates(mostRecentlyUsed, currentPersonas));
    };

    const onRemoveSuggestion = (item: IPersonaProps): void => {
        const indexPeopleList: number = peopleList.indexOf(item);
        const indexMostRecentlyUsed: number = mostRecentlyUsed.indexOf(item);

        if (indexPeopleList >= 0) {
            const newPeople: IPersonaProps[] = peopleList
                .slice(0, indexPeopleList)
                .concat(peopleList.slice(indexPeopleList + 1));
            setPeopleList(newPeople);
        }

        if (indexMostRecentlyUsed >= 0) {
            const newSuggestedPeople: IPersonaProps[] = mostRecentlyUsed
                .slice(0, indexMostRecentlyUsed)
                .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
            setMostRecentlyUsed(newSuggestedPeople);
        }
    };

    const onRenderSuggestionItem = (personaProps: IPersonaProps, suggestionsProps: IBasePickerSuggestionsProps) => {
        return (
            <PeoplePickerItemSuggestion
                personaProps={{ ...personaProps, styles: personaStyles }}
                suggestionsProps={suggestionsProps}
            />
        );
    };

    const renderItemWithSecondaryText = (props: IPeoplePickerItemSelectedProps) => {
        const newProps = {
            ...props,
            item: {
                ...props.item,
                ValidationState: ValidationState.valid,
                showSecondaryText: true,
            },
        };

        return <PeoplePickerItem {...newProps} />;
    };

    function onInputChange(input: string): string {
        const outlookRegEx = /<.*>/g;
        const emailAddress = outlookRegEx.exec(input);

        if (emailAddress && emailAddress[0]) {
            return emailAddress[0].substring(1, emailAddress[0].length - 1);
        }

        return input;
    }

    const textFieldPros: ITextFieldProps = {
        label: props?.label,
        errorMessage: props?.errorMessage,
        description: props?.description,
        required : props?.required,
        disabled : props?.disabled
    }

    const peoplePickerProps: IPeoplePickerProps = {
        key: peoplePickerId,
        ['aria-label']: props?.label ?? "Select User",
        pickerSuggestionsProps: suggestionProps,
        selectionAriaLabel: 'Selected Users',
        removeButtonAriaLabel: 'Remove',
        className: 'ms-PeoplePicker',
        inputProps: {
            ...props as IInputProps,
            id: peoplePickerId,
            disabled: props?.disabled,
            placeholder: props?.placeholder ?? "",
            required: props?.required,
            className: mergeStyles([
                {
                    marginTop: "0px"
                }
            ])
        },
        componentRef: picker,
        resolveDelay: props?.resolveDelay ?? 300,
        itemLimit: props?.personSelectionLimit ?? 10,
        selectedItems: props?.defaultSelectedUsers ?? [],
        disabled: props?.disabled, 
        onResolveSuggestions: onFilterChanged,
        onEmptyInputFocus: returnMostRecentlyUsed,
        getTextFromItem: getTextFromItem,
        onRenderSuggestionsItem: onRenderSuggestionItem,
        onInputChange: onInputChange,
        onRenderItem: props?.showSecondaryText ? renderItemWithSecondaryText : undefined,
        onRemoveSuggestion: onRemoveSuggestion,
        onValidateInput: validateInput,
        onChange: onPeopleSelectChange
    }

    const compactPeopelPicker = <>
        <CompactPeoplePicker
            {...peoplePickerProps}
        />
    </>;

    const listPeoplePicker = <>
        <ListPeoplePicker
            {...peoplePickerProps}
        />
    </>

    const normalPeoplePicker = <>
        <NormalPeoplePicker
            {...peoplePickerProps}
        />
    </>

    return (
        <>
            {props?.label && renderFieldLabelWithHelp(textFieldPros)}
            {
                (peoplePickerType == "List") ? listPeoplePicker :
                    (peoplePickerType == "Normal") ? normalPeoplePicker : compactPeopelPicker
            }
            {props?.description && renderFieldDescription(textFieldPros)}
            {props?.errorMessage ? renderFieldErrorMessage(props?.errorMessage) : ''}
        </>
    );
};

function doesTextContainsName(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
}

function removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
}

function listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
        return false;
    }
    return personas.filter(item => item.text === persona.text || item.secondaryText === persona.secondaryText).length > 0;
}

function convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
}

function getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string || persona.secondaryText as string;
}

function validateInput(input: string): ValidationState {
    if (input.indexOf('@') !== -1) {
        return ValidationState.valid;
    } else if (input.length > 1) {
        return ValidationState.warning;
    } else {
        return ValidationState.invalid;
    }
}
