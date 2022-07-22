import * as React from "react";
import { Callout, DefaultButton, FontWeights, getTheme, IButtonStyles, Icon, IconButton, IIconStyles, IStackStyles, IStackTokens, ITextFieldProps, ITheme, Label, memoizeFunction, Stack, Text } from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";


/**
 * On Render Description for TextField
 */
export const renderFieldDescription = (props: ITextFieldProps): JSX.Element => <FieldDescription {...props} />;
const getDescriptionStyles = memoizeFunction((theme: ITheme) => ({
    root: {
        color: theme.palette.tealDark,
        fontWeight: FontWeights.bold,
        fontSize: '12px',
        fontStyle: 'italic'
    },
}));
const FieldDescription = (props): JSX.Element => {
    const theme = getTheme();

    return (
        <>
            <Text variant="small" styles={getDescriptionStyles(theme)}>
                {props.description}
            </Text>
        </>

    );
};


/**
 * on Render Label for textField
 */
const stackTokens: IStackTokens = {
    childrenGap: 4,
    maxWidth: 300,
};
const labelCalloutStackStyles: Partial<IStackStyles> = { root: { paddingLeft: 20, paddingRight: 20, paddingBottom : 10 } };
const iconButtonStyles: Partial<IButtonStyles> = { root: { marginBottom: -3, fontSize: '12px' } }; 
const iconProps = { iconName: 'Info' };

export const renderFieldLabelWithHelp = (props: ITextFieldProps, showHelp : boolean = false, helpDescription : string | JSX.Element= undefined) => 
{
    const fieldProps = {
        ...props,
        showHelp : showHelp,
        helpDescription : helpDescription
    }
    return (<CustomFieldLabel {...fieldProps}/>);
}
const CustomFieldLabel = (props: any): JSX.Element => {
    const [isHelpVisible, { toggle: toggleIsCalloutVisible, setTrue: setHelpVisible }] = useBoolean(false);
    const descriptionId: string = useId('description');
    const iconButtonId: string = useId('iconButton');
    const labelId: string = useId('label');

    const {showHelp, helpDescription, required, label, description} = props;

    return (
        <>
            <Stack horizontal verticalAlign="center" tokens={stackTokens}>
                <Label id={labelId} htmlFor={labelId} required={required}>{label}</Label>
                {showHelp && <IconButton
                    id={iconButtonId}
                    iconProps={iconProps}
                    title="Info"
                    ariaLabel="Info"
                    onClick={toggleIsCalloutVisible}
                    onMouseEnter={setHelpVisible}
                    styles={iconButtonStyles}
                />}
            </Stack>
            {isHelpVisible && (
                <Callout
                    target={'#' + iconButtonId}
                    setInitialFocus
                    onDismiss={toggleIsCalloutVisible}
                    ariaDescribedBy={descriptionId}
                    role="alertdialog"
                >
                    <Stack tokens={stackTokens} horizontalAlign="start" styles={labelCalloutStackStyles}>
                        <span id={descriptionId}>{ helpDescription ?? description}</span>
                        <DefaultButton onClick={toggleIsCalloutVisible}>Close</DefaultButton>
                    </Stack>
                </Callout>
            )}
        </>
    );
};


/**
 * on FieldErrorMessage for Text Field
 */
const richErrorStackStyles: Partial<IStackStyles> = { root: { height: 20, color: 'red' } };
const richErrorStackTokens: IStackTokens = { childrenGap: 8 };

export const renderFieldErrorMessage = (errorMessage: string) => <FieldErrorMessage errorMessage={errorMessage} />;

const FieldErrorMessage = ({ errorMessage }): JSX.Element => {
    const errorMessageId: string = useId('error-message');
    const theme = getTheme();

    const richErrorIconStyles: Partial<IIconStyles> = { root: { color: theme.palette.redDark } };
    const richErrorMessageStyles: Partial<IIconStyles> = { root: { color: theme.palette.redDark } };
    return (
        <Stack styles={richErrorStackStyles} verticalAlign="center" horizontal tokens={richErrorStackTokens}>
            <Icon iconName="Error" styles={richErrorIconStyles} />
            <Text id={errorMessage} variant="smallPlus" styles={richErrorMessageStyles}> {errorMessage}.</Text>
        </Stack>
    );

    // (errorMessage) ?
    //     (
    //         <Stack styles={richErrorStackStyles} verticalAlign="center" horizontal tokens={richErrorStackTokens}>
    //             <Icon iconName="Error" styles={richErrorIconStyles} />
    //             <Text id={errorMessage} variant="smallPlus" styles={richErrorMessageStyles}> {errorMessage}.</Text>
    //         </Stack>
    //     ) :
    //     (
    //         <></>
    //     );
}