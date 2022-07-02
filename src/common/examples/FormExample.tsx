import { PrimaryButton, DefaultButton, Stack, TextField, DatePicker, defaultDatePickerStrings, mergeStyleSets, IStackTokens, IPersonaProps, Toggle, Checkbox, IIconStyles, Icon, Text, ITextFieldProps, memoizeFunction, ITheme, FontWeights, getTheme, IconButton, Callout, IButtonStyles, Label, MaskedTextField } from "@fluentui/react";
import { useFormik } from "formik";
import * as React from "react";
import { formValidationSchema } from "./forms/defination/form.schema";
import AppContext from "../config/app-context.config";
import { PeoplePicker } from "../components/people-picker/PeoplePicker";
import { PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { useBoolean } from "@fluentui/react-hooks";
import { renderFieldDescription, renderFieldErrorMessage, renderFieldLabelWithHelp } from "../components";


const gapStackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 5,
};

const classNames = mergeStyleSets({
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

export const FormExample: React.FunctionComponent<{}> = (props) => {

    const [selectedUsers, setSelectedUsers] = React.useState<IPersonaProps[]>([]);
    const [isEditMode, { toggle: toggleEditMode }] = useBoolean(false);

    const appContext = AppContext.getInstance();

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
            acceptTerms: false
        },
        validationSchema: formValidationSchema,
        //validateOnChange: true,
        //validateOnBlur: true,
        onSubmit: (data) => {
            console.log(JSON.stringify(data, null, 2));
           
        },
        onReset: () => {
           
            setSelectedUsers([]);
        }
    });

    const fieldHasError = (filedName: string): boolean => {
        return formik.errors[filedName] && formik.touched[filedName];
    }

    return (
        <> 
            <h1>Advance Form Example With Validation</h1> <hr />
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <Toggle
                        label="Enable or Disable Edit Mode"
                        defaultChecked={isEditMode}
                        onText="Edit Mode"
                        offText="View Mode"
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
                                //{[PrincipalType.User, PrincipalType.DistributionList, PrincipalType.SecurityGroup, PrincipalType.SharePointGroup]}
                                principalTypes={[PrincipalType.User]}
                                showSecondaryText={false}
                                personSelectionLimit={3}
                                errorMessage={!selectedUsers?.length || fieldHasError('profile') ? formik.errors["profile"] : ''}
                                description="This is the description text. We can have very long description for the field"
                                disabled={false}
                                readOnly={isEditMode}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem100}>
                            <span>{formik?.values?.profile}</span>
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

                            />
                            {formik.errors['dateOfBirth'] ? renderFieldErrorMessage(formik.errors['dateOfBirth']) : ''}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                required={fieldHasError("fullname")}
                                name="fullname"
                                onRenderLabel={renderFieldLabelWithHelp}
                                label="Full Name"
                                onChange={formik.handleChange}
                                value={formik.values.fullname}
                                placeholder="enter your full name..."
                                // onGetErrorMessage={() => renderFieldErrorMessage(formik.errors['fullname'])} 
                                description="This field contains the name of the user whenever people select in the user profile. People picker currently configured 3 people. The names are seperated bye the semicolon."
                                onRenderDescription={renderFieldDescription}
                                //disabled={true}
                                readOnly={true}
                            />
                            {fieldHasError("fullname") ? renderFieldErrorMessage(formik.errors["fullname"]) : ''}
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <TextField
                                name="address"
                                label="Address"
                                required={fieldHasError("address")}
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                //onGetErrorMessage={() => renderFieldErrorMessage(formik.errors['address'])}
                                placeholder="enter your address..."
                                readOnly={isEditMode}
                            />
                            {fieldHasError("address") ? renderFieldErrorMessage(formik.errors["address"]) : ''}
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem25}>
                            <TextField
                                name="password"
                                label="Password"
                                required={fieldHasError("password")}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                //onGetErrorMessage={() => renderFieldErrorMessage(formik.errors['password'])}
                                placeholder="Enter Password..."
                                type="password"
                                canRevealPassword
                                revealPasswordAriaLabel="Show password"
                                readOnly={isEditMode}
                            />
                            {fieldHasError("password") ? renderFieldErrorMessage(formik.errors["password"]) : ''}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                name="confirmPassword"
                                label="Confirm Password"
                                required={fieldHasError("confirmPassword")}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                //onGetErrorMessage={() => renderFieldErrorMessage(formik.errors['confirmPassword'])}
                                placeholder="Confirm Your Password..."
                                type="password"
                                canRevealPassword
                                revealPasswordAriaLabel="Show password"
                                readOnly={isEditMode}
                            />
                            {fieldHasError("confirmPassword") ? renderFieldErrorMessage(formik.errors["confirmPassword"]) : ''}
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem25}>
                            <MaskedTextField
                                name="phoneNumber"
                                label="Phone Number"
                                required={fieldHasError("confirmPassword")}
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                prefix={"+1"}
                                mask="(***) ***-****"
                                maskFormat={{
                                    '*': /[0-9]/,
                                }}
                                maskChar="_"
                                //errorMessage={formik.errors['phoneNumber']}
                                placeholder="Enter your phone number"
                                //onGetErrorMessage={() => renderFieldErrorMessage(formik.errors['phoneNumber'])}
                                readOnly={isEditMode}
                            />
                            {fieldHasError("phoneNumber") ? renderFieldErrorMessage(formik.errors["phoneNumber"]) : ''}
                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                label="Domain Name"
                                name="domainName"
                                required={fieldHasError("domainName")}
                                onChange={formik.handleChange}
                                value={formik.values.domainName}
                                prefix="https://"
                                suffix=".com"
                                readOnly={isEditMode}
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
                            {fieldHasError("acceptTerms") ? renderFieldErrorMessage(formik.errors["domainName"]) : ''}

                        </Stack.Item>
                        <Stack.Item className={classNames.inputItem50}>
                            <TextField
                                label="With auto adjusting height"
                                name="domainName"
                                required={fieldHasError("domainName")}
                                onChange={formik.handleChange}
                                value={formik.values.domainName}
                                multiline autoAdjustHeight />
                            {fieldHasError("acceptTerms") ? renderFieldErrorMessage(formik.errors["domainName"]) : ''}

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
                                disabled={isEditMode}
                            />
                            {fieldHasError("acceptTerms") ? renderFieldErrorMessage(formik.errors["acceptTerms"]) : ''}

                        </Stack.Item>
                    </Stack> 

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item>
                            <PrimaryButton text="Submit Form" onClick={formik.submitForm} />
                        </Stack.Item>
                        <Stack.Item>
                            <DefaultButton text="Reset Form" onClick={formik.handleReset} />
                        </Stack.Item>
                    </Stack>
                </form>
            </div>
        </>
    );
}