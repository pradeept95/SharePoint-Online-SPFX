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
} from '@fluentui/react/lib/Pickers';
import { getSP } from '../../config/pnpjs.config';
import { PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts',
};

const checkboxStyles = {
    root: {
        marginTop: 10,
    },
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

export const PeoplePicker: React.FunctionComponent<{
    peoplePickerType?: "Normal" | "Compact" | "List",
    principalTypes ? : PrincipalType[]
    onChange: (items : IPersonaProps[]) => any
}> = ({ peoplePickerType, principalTypes, onChange }) => {
    const [delayResults, setDelayResults] = React.useState(false);
    const [isPickerDisabled, setIsPickerDisabled] = React.useState(false);
    const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState<IPersonaProps[]>([]);
    const [peopleList, setPeopleList] = React.useState<IPersonaProps[]>([]);
    const [showSecondaryText, setShowSecondaryText] = React.useState(true);

    const picker = React.useRef(null);

    const getAllUsers = async () => {
        const sp = await getSP();
        const users = await (await sp.web.siteUsers())
                            .filter(x =>  principalTypes?.length == 0 
                                || principalTypes.indexOf(x.PrincipalType) > -1);
        console.log(users);
        setPeopleList(users.map(
            user => {
                return ({
                    id: `${user.Id}`,
                    text: user.Title,
                    secondaryText: user.Email,
                    tertiaryText: user.LoginName 
                } as IPersonaProps);
            }
        ));
    }

    React.useEffect(() => {
        getAllUsers();
    }, []);

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
        return peopleList.filter(item => doesTextStartWith(item.text as string, filterText));
    };

    const filterPromise = (personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
        if (delayResults) {
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

    const onDisabledButtonClick = (): void => {
        setIsPickerDisabled(!isPickerDisabled);
    };

    const onToggleDelayResultsChange = (): void => {
        setDelayResults(!delayResults);
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

    const compactPeopelPicker = <>
        <CompactPeoplePicker
            // eslint-disable-next-line react/jsx-no-bind
            onResolveSuggestions={onFilterChanged}
            // eslint-disable-next-line react/jsx-no-bind
            onEmptyInputFocus={returnMostRecentlyUsed}
            getTextFromItem={getTextFromItem}
            pickerSuggestionsProps={suggestionProps}
            selectionAriaLabel={'Selected contacts'}
            removeButtonAriaLabel={'Remove'}
            className={'ms-PeoplePicker'}
            onRenderItem={showSecondaryText ? renderItemWithSecondaryText : undefined}
            // eslint-disable-next-line react/jsx-no-bind
            onRemoveSuggestion={onRemoveSuggestion}
            onValidateInput={validateInput}
            // inputProps={{
            //     onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            //     onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            //     'aria-label': 'People Picker',
            // }}
            componentRef={picker}
            resolveDelay={300}
            disabled={isPickerDisabled}
            onChange={onChange} 
            itemLimit ={1}
            searchingText = "Getting users"
        />
    </>;

    const listPeoplePicker = <>
        <ListPeoplePicker
            // eslint-disable-next-line react/jsx-no-bind
            onResolveSuggestions={onFilterChanged}
            // eslint-disable-next-line react/jsx-no-bind
            onEmptyInputFocus={returnMostRecentlyUsed}
            getTextFromItem={getTextFromItem}
            className={'ms-PeoplePicker'}
            pickerSuggestionsProps={suggestionProps}
            key={'list'}
            selectionAriaLabel={'Selected contacts'}
            onRenderItem={showSecondaryText ? renderItemWithSecondaryText : undefined}
            removeButtonAriaLabel={'Remove'}
            // eslint-disable-next-line react/jsx-no-bind
            onRemoveSuggestion={onRemoveSuggestion}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderSuggestionsItem={onRenderSuggestionItem}
            onValidateInput={validateInput} 
            // inputProps={{
            //     onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            //     onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            //     'aria-label': 'People Picker',
            // }}
            componentRef={picker}
            resolveDelay={300}
            disabled={isPickerDisabled}
            onChange={onChange}
            itemLimit ={1} 
        />
    </>

    const normalPeoplePicker = <>
        <NormalPeoplePicker
            // eslint-disable-next-line react/jsx-no-bind
            onResolveSuggestions={onFilterChanged}
            // eslint-disable-next-line react/jsx-no-bind
            onEmptyInputFocus={returnMostRecentlyUsed}
            getTextFromItem={getTextFromItem}
            pickerSuggestionsProps={suggestionProps}
            className={'ms-PeoplePicker'}
            key={'normal'}
            // eslint-disable-next-line react/jsx-no-bind
            onRemoveSuggestion={onRemoveSuggestion}
            onRenderItem={showSecondaryText ? renderItemWithSecondaryText : undefined}
            onValidateInput={validateInput}
            selectionAriaLabel={'Selected contacts'}
            removeButtonAriaLabel={'Remove'} 
            // inputProps={{
            //     onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            //     onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            //     'aria-label': 'People Picker',
            // }}
            componentRef={picker}
            onInputChange={onInputChange}
            resolveDelay={300}
            disabled={isPickerDisabled}
            onChange={onChange}
            itemLimit = {1}
        />
    </>
 
    return (
        <>
            {
                (peoplePickerType == "List") ? listPeoplePicker :
                    (peoplePickerType == "Normal") ? normalPeoplePicker :  compactPeopelPicker 
            } 
        </>
    );
};

function doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
}

function listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
        return false;
    }
    return personas.filter(item => item.text === persona.text).length > 0;
}

function convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
}

function getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
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
