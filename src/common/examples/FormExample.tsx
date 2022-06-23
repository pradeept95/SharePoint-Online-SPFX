import { IStackProps, IStackStyles, PrimaryButton, DefaultButton, Stack, TextField, DatePicker, defaultDatePickerStrings } from "@fluentui/react";
import { useFormik } from "formik";
import * as React from "react";
import { formValidationSchema } from "./forms/defination/form.schema";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import AppContext from "../config/app-context.config"; 

const stackTokens = { childrenGap: 50 }; 
const stackStyles: Partial<IStackStyles> = { root: { width: '100%', marginTop: '10px' } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

export const FormExample: React.FunctionComponent<{}> = (props) => {

    const appContext = AppContext.getInstance();

    const formik = useFormik({
        initialValues: {
            fullname: "",
            address: "",
            dateOfBirth: "",
            profile: "" 
        },
        validationSchema: formValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (data) => {
            console.log(JSON.stringify(data, null, 2));
        },
    });

    const getErrorMessage  = (filedName : string) : string => {
        return formik.touched[filedName] && formik.errors[filedName] ? formik.errors[filedName]:  "";
    } 

    const isRequiredField = (filedName : string) : boolean => {
        return formik.touched[filedName] && formik.errors[filedName];
    } 

    return (
        <>
            <h1>Advance Form Example With Validation</h1> <hr />
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                        <Stack {...columnProps}>
                        <PeoplePicker 
                                context={appContext.context}
                                titleText="Select an User"
                                personSelectionLimit={1}

                                // Leave this blank in case you want to filter from all users
                                groupName={""} 
                                showtooltip={true}
                                required={true}
                                disabled={false}
                                onChange={(peoples) => {
                                    console.log(peoples)
                                    const emails = peoples.map(x => x?.secondaryText)?.join(";")
                                    const names = peoples.map(x => x?.text)?.join(";")
                                    formik.setFieldValue('profile', emails, false);
                                    formik.setFieldValue('fullname', names, true);
                                }}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User, PrincipalType.DistributionList, PrincipalType.SecurityGroup, PrincipalType.SharePointGroup]}
                                resolveDelay={1000} 
                                placeholder = "Please type at least 3 character to search user..."
                                errorMessage={ getErrorMessage("profile") } 
                            /> 
                        </Stack>
                        <Stack {...columnProps}>
                        <TextField 
                                name="fullname"
                                label="Full Name"
                                onChange={formik.handleChange}
                                value={formik.values.fullname}
                                errorMessage={ getErrorMessage("fullname") }
                                placeholder="enter your full name..."
                            /> 
                            <span>{formik?.values?.profile}</span>
                        </Stack>
                    </Stack>
                    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                        <Stack {...columnProps}>
                            <DatePicker
                                isRequired={isRequiredField("dateOfBirth")}
                                label="Date of Birth"
                                value={formik.values.dateOfBirth ? new Date(formik.values.dateOfBirth) : null}
                                strings={
                                    {
                                        ...defaultDatePickerStrings,
                                        invalidInputErrorMessage: getErrorMessage("dateOfBirth")
                                    }}
                                placeholder="Select a date..."
                                onSelectDate={(val) => {
                                    formik.setFieldValue('dateOfBirth', val, false);
                                }} 
                            />
                        </Stack>
                        <Stack {...columnProps}>
                        <TextField
                                name="address"
                                label="Address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                errorMessage={ getErrorMessage("address") }
                                placeholder="enter your address..."
                            />
                        </Stack>
                    </Stack>
                    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                        <Stack {...columnProps}>
                            <PrimaryButton text="Submit Form" onClick={formik.submitForm} />
                        </Stack>
                        <Stack {...columnProps}>
                            <DefaultButton text="Reset Form" onClick={formik.handleReset} />
                        </Stack>
                    </Stack>
                </form>
            </div>
        </>
    );
}