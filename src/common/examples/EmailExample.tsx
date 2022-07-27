import { DefaultButton, IPersonaProps, IStackTokens, mergeStyleSets, PrimaryButton, Stack, TextField, Toggle } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { renderFieldErrorMessage } from "../components";
import { RichTextEditor } from "../components/editor/editor";
import { PeoplePicker } from "../components/people-picker/PeoplePicker";
import { IEmailProps, useEmailService } from "../service/useEmailService";
import { emailValidationSchema } from "./forms/defination/form.schema";

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

const gapStackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 5,
};

export const EmailExample: React.FunctionComponent<{}> = (props) => {

    const [fromUsers, setFromUsers] = useState<IPersonaProps[]>([]);
    const [toUsers, setToUsers] = useState<IPersonaProps[]>([]);
    const [ccUsers, setCCUsers] = useState<IPersonaProps[]>([]);
    const [bccUsers, setBCCUsers] = useState<IPersonaProps[]>([]);
    const [isViewMode, { toggle: toggleEditMode }] = useBoolean(false);
    const [showFormikData, { toggle: toggleFormikData }] = useBoolean(false);

    const { sendTestEmail } = useEmailService();

    const formik = useFormik<IEmailProps>({
        initialValues :  {
            from: "",
            to: [],
            cc: [],
            bcc: [],
            subject: '',
            body: ''
        },
        validationSchema: emailValidationSchema,
        //validateOnChange : true,
        onSubmit: async (data) => {
            console.log(JSON.stringify(data, null, 2));
            await sendTestEmail(data);
        },
        onReset: () => {
            setFromUsers([]);
            setToUsers([]);
            setCCUsers([]);
            setBCCUsers([]);
        }
    });

    const fieldHasError = (filedName: string): boolean => {
        return (formik.touched[filedName] && (formik.errors[filedName]));
    }

    return (
        <div style={{paddingLeft : 15, paddingRight : 15}}>
            <h1>Email Sender Example</h1> <hr />
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
                                label="From:"
                                placeholder="Type name or email to search..."
                                required={fieldHasError("from")}
                                defaultSelectedUsers={fromUsers}
                                onPeopleSelectChange={(peoples) => {
                                    setFromUsers(peoples)
                                    const emails = peoples.map(x => x?.secondaryText)?.[0]
                                    formik.setFieldValue('from', emails, true);
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('from', true)
                                }}
                                principalTypes={[PrincipalType.User]}
                                showSecondaryText={false}
                                personSelectionLimit={1}
                                errorMessage={!fromUsers?.length && fieldHasError('from') ? formik.errors["from"] : ''}
                                description="Select user to set From Email Address."
                                disabled={isViewMode}
                                readOnly={isViewMode}
                            />
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <PeoplePicker
                                peoplePickerType="Compact"
                                label="To:"
                                placeholder="Type name or email to search..."
                                required={fieldHasError("to")}
                                defaultSelectedUsers={toUsers}
                                onPeopleSelectChange={(peoples) => {
                                    setToUsers(peoples)
                                    const emails = peoples.map(x => x?.secondaryText);
                                    formik.setFieldValue('to', emails, true);
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('to', true)
                                }}
                                principalTypes={[PrincipalType.User]}
                                showSecondaryText={false}
                                personSelectionLimit={30}
                                errorMessage={!fromUsers?.length && fieldHasError('to') ? formik.errors["to"] as string : ''}
                                description="Select user to set To Email Addresses."
                                disabled={isViewMode}
                                readOnly={isViewMode}
                            />
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <PeoplePicker
                                peoplePickerType="Compact"
                                label="CC"
                                placeholder="Type name or email to search..."
                                required={fieldHasError("cc")}
                                defaultSelectedUsers={ccUsers}
                                onPeopleSelectChange={(peoples) => {
                                    setCCUsers(peoples)
                                    const emails = peoples.map(x => x?.secondaryText)
                                    formik.setFieldValue('cc', emails, true);
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('cc', true)
                                }}
                                principalTypes={[PrincipalType.User]}
                                showSecondaryText={false}
                                personSelectionLimit={30}
                                errorMessage={!fromUsers?.length && fieldHasError('cc') ? formik.errors["cc"] as string : ''}
                                description="Select user to set CC Email Address."
                                disabled={isViewMode}
                                readOnly={isViewMode}
                            />
                        </Stack.Item>
                    </Stack>
                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <PeoplePicker
                                peoplePickerType="Compact"
                                label="BCC"
                                placeholder="Type name or email to search..."
                                required={fieldHasError("bcc")}
                                defaultSelectedUsers={bccUsers}
                                onPeopleSelectChange={(peoples) => {
                                    setBCCUsers(peoples)
                                    const emails = peoples.map(x => x?.secondaryText);
                                    formik.setFieldValue('bcc', emails, true);
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('bcc', true);
                                }}
                                principalTypes={[PrincipalType.User]}
                                showSecondaryText={false}
                                personSelectionLimit={30}
                                errorMessage={!fromUsers?.length && fieldHasError('bcc') ? formik.errors["bcc"] as string : ''}
                                description="Select user to set BCC Email Address."
                                disabled={isViewMode}
                                readOnly={isViewMode}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <TextField
                                label="Subject"
                                name="subject"
                                placeholder="Enter your email subject..."
                                required={fieldHasError("subject")}
                                onChange={formik.handleChange}
                                value={formik.values.subject} 
                            />
                            {fieldHasError("subject") ? renderFieldErrorMessage(formik.errors["subject"]) : ''}
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item className={classNames.inputItem75}>
                            <RichTextEditor
                                label="Email Body"
                                placeholder="Compose your Email Message...."
                                required={fieldHasError("description")}
                                value={formik?.values?.body}
                                onChange={(value) => {
                                    formik.setFieldValue('body', value, true);
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched('body', true)
                                }}
                                errorMessage={fieldHasError('body') ? formik.errors["body"] : ''}
                                description="You can format message."
                                readOnly={isViewMode}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack horizontal tokens={gapStackTokens}>
                        <Stack.Item>
                            <PrimaryButton disabled={isViewMode} text="Send Email" onClick={formik.submitForm} />
                        </Stack.Item>
                        <Stack.Item>
                            <DefaultButton disabled={isViewMode} text="Reset Form" onClick={formik.handleReset} />
                        </Stack.Item>
                    </Stack>
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
                        </Stack.Item>
                    </Stack>
                </form>
            </div>
        </div>
    );
}