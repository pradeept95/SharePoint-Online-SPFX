import { PrimaryButton, DefaultButton, Stack, TextField, DatePicker, defaultDatePickerStrings, mergeStyleSets, IStackTokens, IPersonaProps, Toggle, Checkbox, IIconStyles, Icon, Text, ITextFieldProps, memoizeFunction, ITheme, FontWeights, getTheme, IconButton, Callout, IButtonStyles, Label, MaskedTextField, Facepile, IFacepilePersona, PersonaSize, PersonaPresence, IDropdownOption, DropdownMenuItemType, Dropdown, ActionButton, Layer } from "@fluentui/react";
import { useFormik } from "formik";
import * as React from "react";
import { formValidationSchema } from "./forms/defination/form.schema";
import AppContext from "../config/app-context.config";
import { PeoplePicker } from "../components/people-picker/PeoplePicker";
import { PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { useBoolean } from "@fluentui/react-hooks";
import { renderFieldDescription, renderFieldErrorMessage, renderFieldLabelWithHelp } from "../components";
import { Counter } from "./Counter";
import { useState } from "react";
import { RichTextEditor } from "../components/editor/editor";
import { useEmailService } from "../service/useEmailService";
 
const gapStackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 5,
};

const options: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' },
];

const classNames = mergeStyleSets({
    inputItem20: {
        width: '20%'
    },
    inputItem25: {
        width: '25%'
    },
    inputItem50: {
        width: '50%'
    },
    inputItem75: {
        width: '75%'
    },
    inputItem100: {
        width: '100%'
    }
});

const helpDetails: JSX.Element
    = <>
        <h2>Hello form Help</h2>
        <p>This is help description</p>
        <Counter />
    </>;

export const FormExample: React.FunctionComponent<{}> = (props) => {

    const [selectedUsers, setSelectedUsers] = React.useState<IPersonaProps[]>([]);
    const [isViewMode, { toggle: toggleEditMode }] = useBoolean(false);
    const [showFormikData, { toggle: toggleFormikData }] = useBoolean(false); 

    const appContext = AppContext.getInstance();

    const { sendTestEmail } = useEmailService();

    const formik = useFormik({
        initialValues: {
            fullname: "",
            address: "",
            dateOfBirth: "",
            profile: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            domainName: "",
            externalContact: [
                {
                    contactName: "",
                    contactPhone: "",
                    contactEmail: "",
                    organization: "",
                }
            ],
            description : '',
            acceptTerms: false
        },
        validationSchema: formValidationSchema,
        //validateOnChange : true,
        onSubmit: (data) => {
            console.log(JSON.stringify(data, null, 2));
        },
        onReset: () => {
            setSelectedUsers([]);
        }
    }); 

    const fieldHasError = (filedName: string): boolean => {
        return (formik.touched[filedName] && (formik.errors[filedName]));
    }

    const getTextFieldDefaultProps = (
        fieldName: string,
        label?: string,
        placeholder?: string,
        disabled: boolean = false,
        readOnly: boolean = false) => {
        return ({
            required: fieldHasError(fieldName),
            name: fieldName ?? '',
            label: label ?? '',
            value: formik.values?.[fieldName],
            placeholder: placeholder ?? '',
            disabled: disabled,
            readOnly: readOnly,
            onChange: formik?.handleChange,
            onBlur: () => {
                formik?.setFieldTouched(fieldName, true);
            },
            //onGetErrorMessage : () => renderFieldErrorMessage(formik.errors[fieldName]),
            validateOnFocusIn: true,
            validateOnFocusOut: true,
            validateOnLoad: true,
        });
    }

    const [imagesFadeIn, { toggle: toggleImagesFadeIn }] = useBoolean(true);
    const [numberOfFaces, setNumberOfFaces] = React.useState(3);
    const [personaSize, setPersonaSize] = React.useState(PersonaSize.size32);

    const getPersonaPresence = (personaName: string): PersonaPresence => {
        const presences = [
            PersonaPresence.away,
            PersonaPresence.busy,
            PersonaPresence.online,
            PersonaPresence.offline,
            PersonaPresence.offline,
        ];
        return presences[personaName.charCodeAt(1) % 5];
    };

    const getPersonaProps = React.useCallback(
        (persona: IFacepilePersona) => ({
            imageShouldFadeIn: imagesFadeIn,
            presence: getPersonaPresence(persona.personaName!),
        }),
        [imagesFadeIn],
    );

    const users = selectedUsers.map((x) => {
        return ({ personaName: x.text } as IFacepilePersona)
    });

    const personas = React.useMemo(() => selectedUsers.map((x) => {
        return ({ personaName: x.text } as IFacepilePersona)
    }).slice(0, numberOfFaces), [selectedUsers]);
    const overflowPersonas = React.useMemo(() => selectedUsers.map((x) => {
        return ({ personaName: x.text } as IFacepilePersona)
    }).slice(numberOfFaces), [selectedUsers]);

    const addExternalContactRow = () => {
        formik.setFieldValue('externalContact',
            [...formik.values?.externalContact,
            {
                contactName: "",
                contactPhone: "",
                contactEmail: "",
                organization: "",
            }]);

        formik.validateField("externalContact");
    }

    const deleteExternalContactRow = (index: number) => {
        const contactList = [...formik.values?.externalContact];
        contactList?.splice(index, 1);
        formik.setFieldValue('externalContact', [...contactList])
        formik.validateField("externalContact");
    }

    const renderExternalContactItem = (externalContact, index: number) => {
        // const externalContact = formik?.values?.externalContact[index];
        const errors = formik?.errors?.externalContact?.length ? formik?.errors?.externalContact[index] : {};
        const touched = formik?.touched?.externalContact?.length ? formik?.touched?.externalContact[index] : {};

        const isLastRow = formik?.values?.externalContact?.length === (index + 1);
        const isSingleRow = formik?.values?.externalContact?.length === 1;

        return (
            <Stack horizontal tokens={gapStackTokens} key={index}>
                <Stack.Item className={classNames.inputItem20}>
                    <TextField
                        name={`externalContact.${index}.contactName`}
                        placeholder="Contact Name"
                        onChange={formik.handleChange}
                        value={externalContact?.contactName}
                        readOnly={isViewMode}
                        onBlur={() => {
                            formik.setFieldTouched(`externalContact.${index}.contactName`, true)
                        }}
                    />
                    {touched?.contactName && errors?.['contactName'] ? renderFieldErrorMessage(errors?.['contactName']) : ''}
                </Stack.Item>
                <Stack.Item className={classNames.inputItem20}>
                    <MaskedTextField
                        name={`externalContact.${index}.contactPhone`}
                        placeholder="Contact Phone"
                        onChange={formik.handleChange}
                        value={externalContact?.contactPhone}
                        readOnly={isViewMode}
                        prefix={"+1"}
                        mask="(***) ***-****"
                        maskFormat={{
                            '*': /[0-9]/,
                        }}
                        maskChar="_"
                    />
                    {touched?.contactPhone && errors?.['contactPhone'] ? renderFieldErrorMessage(errors['contactPhone']) : ''}
                </Stack.Item>
                <Stack.Item className={classNames.inputItem20}>
                    <TextField
                        name={`externalContact.${index}.contactEmail`}
                        placeholder="Email Address"
                        onChange={formik.handleChange}
                        value={externalContact?.contactEmail}
                        readOnly={isViewMode}
                    />
                    {touched?.contactEmail && errors?.['contactEmail'] ? renderFieldErrorMessage(errors['contactEmail']) : ''}
                </Stack.Item>
                <Stack.Item className={classNames.inputItem20}>
                    <TextField
                        name={`externalContact.${index}.organization`}
                        placeholder="Organization Name"
                        onChange={formik.handleChange}
                        value={externalContact?.organization}
                        readOnly={isViewMode}
                    />
                    {touched?.organization && errors?.['organization'] ? renderFieldErrorMessage(errors['organization']) : ''}
                </Stack.Item>
                <Stack.Item className={classNames.inputItem20}>
                    {isLastRow && <ActionButton iconProps={{ iconName: 'AddFriend' }} disabled={isViewMode} onClick={addExternalContactRow} />}
                    <ActionButton iconProps={{ iconName: 'Delete' }} disabled={isViewMode || isSingleRow} onClick={() => deleteExternalContactRow(index)} />
                </Stack.Item>
            </Stack>
        );
    }

    return (
        <div style={{paddingLeft : 15, paddingRight: 15}}>
            <h1>Advance Form Example With Validation</h1> <hr />
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <Toggle
                        label="Enable or Disable Edit Mode"
                        defaultChecked={isViewMode}
                        onText="View Mode"
                        offText="Edit Mode"
                        onChange={toggleEditMode} />

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <PeoplePicker
                                peoplePickerType="Compact"
                                label="Employee Profile"
                                placeholder="Enter name or email to search user"
                                required={fieldHasError("profile")}
                                defaultSelectedUsers={selectedUsers}
                                onPeopleSelectChange={(peoples) => {
                                    console.log(peoples)
                                    setSelectedUsers(peoples)

                                    const emails = peoples.map(x => x?.secondaryText)?.join(";")
                                    const names = peoples.map(x => x?.text)?.join(";")
                                    formik.setFieldValue('profile', emails, true);
                                    formik.setFieldValue('fullname', names, true);

                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('profile', true)
                                }}
                                //{[PrincipalType.User, PrincipalType.DistributionList, PrincipalType.SecurityGroup, PrincipalType.SharePointGroup]}
                                principalTypes={[PrincipalType.User]}
                                showSecondaryText={false}
                                personSelectionLimit={30}
                                errorMessage={!selectedUsers?.length && fieldHasError('profile') ? formik.errors["profile"] : ''}
                                description="This is the description text. We can have very long description for the field"
                                disabled={isViewMode}
                                readOnly={isViewMode}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem100}>
                            <span>{formik?.values?.profile}</span>
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem100}>
                            <Facepile
                                personaSize={personaSize}
                                personas={personas}
                                overflowPersonas={overflowPersonas}
                                getPersonaProps={getPersonaProps}
                                ariaDescription="To move through the items use left and right arrow keys."
                                ariaLabel="Selected Users"
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem25}>
                            <DatePicker
                                label="Date of Birth"
                                value={formik.values.dateOfBirth ? new Date(formik.values.dateOfBirth) : null}
                                strings={
                                    {
                                        ...defaultDatePickerStrings
                                    }}
                                placeholder="Select a date..."
                                onSelectDate={(val) => {
                                    formik.setFieldValue('dateOfBirth', val, true);
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('dateOfBirth', true)
                                }}
                            />
                            {fieldHasError('dateOfBirth') ? renderFieldErrorMessage(formik.errors['dateOfBirth']) : ''}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                {...getTextFieldDefaultProps(
                                    'fullname',
                                    'Full Name',
                                    'Enter Full Name',
                                    false,
                                    isViewMode)
                                }
                                onRenderLabel={(fieldProps) => renderFieldLabelWithHelp(fieldProps, true, helpDetails)}
                                description="This field contains the name of the user whenever people select in the user profile. People picker currently configured 3 people. The names are seperated bye the semicolon."
                                onRenderDescription={renderFieldDescription}
                            />
                            {fieldHasError("fullname") ? renderFieldErrorMessage(formik.errors["fullname"]) : ''}
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <TextField
                                {...getTextFieldDefaultProps(
                                    'address',
                                    'Address',
                                    'Enter Your Address',
                                    false,
                                    isViewMode)
                                }
                                onRenderLabel={(fieldProps) => renderFieldLabelWithHelp(fieldProps, true, helpDetails)}
                            />
                            {fieldHasError("address") ? renderFieldErrorMessage(formik.errors["address"]) : ''}
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem25}>
                            <TextField
                                {...getTextFieldDefaultProps(
                                    'password',
                                    'Password',
                                    'Enter Password...',
                                    false,
                                    isViewMode)
                                }
                                type="password"
                                canRevealPassword
                                revealPasswordAriaLabel="Show password"
                            />
                            {fieldHasError("password") ? renderFieldErrorMessage(formik.errors["password"]) : ''}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                {...getTextFieldDefaultProps(
                                    'confirmPassword',
                                    'Confirm Password',
                                    'Confirm Password...',
                                    false,
                                    isViewMode)
                                }
                                type="password"
                                canRevealPassword
                                revealPasswordAriaLabel="Show password"
                            />
                            {fieldHasError("confirmPassword") ? renderFieldErrorMessage(formik.errors["confirmPassword"]) : ''}
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem25}>
                            <MaskedTextField
                                {...getTextFieldDefaultProps(
                                    'phoneNumber',
                                    'Phone Number',
                                    'Enter Phone Number...',
                                    false,
                                    isViewMode)
                                }
                                prefix={"+1"}
                                mask="(***) ***-****"
                                maskFormat={{
                                    '*': /[0-9]/,
                                }}
                                maskChar="_"
                            />
                            {fieldHasError("phoneNumber") ? renderFieldErrorMessage(formik.errors["phoneNumber"]) : ''}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                {...getTextFieldDefaultProps(
                                    'domainName',
                                    'Domain Name',
                                    'Enter Domain Name...',
                                    false,
                                    isViewMode)
                                }
                                prefix="https://"
                                suffix=".com"
                            />
                            {fieldHasError("domainName") ? renderFieldErrorMessage(formik.errors["domainName"]) : ''}
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem25}>
                            <TextField
                                label="With auto adjusting height"
                                name="domainName"
                                required={fieldHasError("domainName")}
                                onChange={formik.handleChange}
                                value={formik.values.domainName}
                                multiline autoAdjustHeight
                            />
                            {fieldHasError("domainName") ? renderFieldErrorMessage(formik.errors["domainName"]) : ''}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                label="With auto adjusting height"
                                name="domainName"
                                required={fieldHasError("domainName")}
                                onChange={formik.handleChange}
                                value={formik.values.domainName}
                                multiline autoAdjustHeight
                            />
                            {fieldHasError("domainName") ? renderFieldErrorMessage(formik.errors["domainName"]) : ''}
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem25}>
                            <Dropdown
                                placeholder="Select an option"
                                label="Basic uncontrolled example"
                                options={options}  
                                required={fieldHasError("domainName")}
                                onChange={(e, item, index) => {
                                    formik.setFieldValue('domainName', item.text, true);
                                }}
                                defaultSelectedKey={formik.values.domainName}
                                disabled={isViewMode}
                            />
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <Dropdown
                                placeholder="Select options"
                                label="Multi-select uncontrolled example"
                                //defaultSelectedKeys={['apple', 'banana', 'grape']}
                                multiSelect
                                options={options}
                                disabled={isViewMode}
                                onChange={(e, item, index) => { 
                                    const keys = formik.values['address'];  
                                    formik.setFieldValue('address', [keys, item.key].join(", "), true);
                                }}
                            />
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                        <RichTextEditor 
                                label="Example for Rich Text Editor"
                                placeholder="This is placehoder, we can type anything here."
                                required={fieldHasError("description")}
                                value={formik?.values?.description }
                                onChange={(value) => {   
                                    formik.setFieldValue('description', value, true);  
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('description', true)
                                }}   
                                errorMessage={fieldHasError('description') ? formik.errors["description"] : ''}
                                description="This is the description of the rich text editor" 
                                readOnly={isViewMode}
                                showHelp={true}
                                helpDescription={helpDetails}
                            />
                        </Stack.Item> 
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <Checkbox
                                name="acceptTerms"
                                required={fieldHasError("acceptTerms")}
                                onChange={formik.handleChange}
                                checked={formik.values.acceptTerms}
                                label="Accept Term. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus quo commodi quod aperiam laudantium molestiae iure velit aliquam excepturi perspiciatis sapiente saepe, reprehenderit quis eum quam? Illo, nobis vitae."
                                disabled={isViewMode}
                            />
                            {fieldHasError("acceptTerms") ? renderFieldErrorMessage(formik.errors["acceptTerms"]) : ''}

                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem100}>
                            <h3>External Contacts</h3>
                            <hr />
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem20}>
                            {renderFieldLabelWithHelp({ label: 'Contact Name', required: true, description: "Please enter contact name" } as ITextFieldProps)}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem20}>
                            {renderFieldLabelWithHelp({ label: 'Contact Phone', required: true, description: "Please enter Contact phone number" } as ITextFieldProps)}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem20}>
                            {renderFieldLabelWithHelp({ label: 'Email Address', required: true, description: "Please enter email address" } as ITextFieldProps)}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem20}>
                            {renderFieldLabelWithHelp({ label: 'Organization', description: "Please enter Organization name" } as ITextFieldProps)}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem20}>
                            {renderFieldLabelWithHelp({ label: 'Actions', description: "Please enter Organization name" } as ITextFieldProps)}
                        </Stack.Item>
                    </Stack>

                    {
                        formik.values["externalContact"]?.length ?
                            <>
                                {
                                    formik.values?.["externalContact"]?.map((item, index) => renderExternalContactItem(item, index))
                                }
                            </> :
                            <>
                            </>
                    }

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <Toggle
                                label="Enable or Disable Edit Mode"
                                defaultChecked={showFormikData}
                                onText="Showing Formik Data"
                                offText="Hiding Formik Data"
                                onChange={toggleFormikData}
                            />
                            {
                                showFormikData && <pre>{JSON.stringify(formik, null, 2)}</pre>
                            }
                            {/* <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
                            <pre>{JSON.stringify(formik.touched, null, 2)}</pre>
                            <pre>{JSON.stringify(formik.getFieldMeta("externalContact"), null, 2)}</pre> */}
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item>
                            <PrimaryButton disabled={isViewMode} text="Submit Form" onClick={formik.submitForm} />
                        </Stack.Item>
                        <Stack.Item>
                            <DefaultButton disabled={isViewMode} text="Reset Form" onClick={formik.handleReset} />
                        </Stack.Item>
                    </Stack>
                </form>
            </div>
        </div>
    );
}