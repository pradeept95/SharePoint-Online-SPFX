import { AnimationClassNames, getTheme, IStackProps, Label, Layer, mergeStyles, MessageBar, MessageBarType, Spinner, SpinnerSize, Stack, Toggle } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import * as React from "react";
import { useContext } from "react";
import { LoadingContext } from "../../services/spinner.service";

const rowProps: IStackProps = { horizontal: false, verticalAlign: 'center' }; 
const theme = getTheme();
const contentClass = mergeStyles([
    {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: theme.palette.white,
        minHeight: '100vh',
        minWidth: '100vw' 
    },
    AnimationClassNames.fadeIn100,
]);

const tokens = {
    sectionStack: {
        childrenGap: 10,
    },
    spinnerStack: {
        childrenGap: 20,
    },
};

export const LoadingSpinner: React.FunctionComponent<{}> = (props) => {
 
    const {showLoader, loadingMessage} = useContext(LoadingContext)

    const content = <div className={contentClass}>
        <Stack {...rowProps} tokens={tokens.spinnerStack}>
            <Label>{loadingMessage}...</Label>
            <Spinner size={SpinnerSize.large} />
        </Stack>
    </div>;

    return (
        <>
            <Stack verticalAlign="center" horizontalAlign="center">
               {showLoader ? <Layer>{content}</Layer> : ''}
            </Stack>
        </>
    );
}