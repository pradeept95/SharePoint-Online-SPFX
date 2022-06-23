import { AnimationClassNames, getTheme, Layer, mergeStyles, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import * as React from "react"; 
import { useLoading } from "../../hooks";

const theme = getTheme();
const contentClass = mergeStyles([
    {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: theme.palette.white,
        minHeight: '100vh',
        minWidth: '100vw',

        display: 'flex',
        alignItems : 'center',
        justifyContent: 'center',
    },
    AnimationClassNames.fadeIn100,
]);  

export const LoadingSpinner: React.FunctionComponent<{}> = (props) => {

    const { loadingState } = useLoading();

    const content = <div className={contentClass}>
                        <Stack>
                            <Stack.Item align="center">
                                <Spinner styles={{
                                    root:
                                    { 
                                        // display: 'flex',
                                        // alignItems : 'center',
                                        // justifyContent: 'center',
                                    },
                                    label : {
                                        fontSize : '15px',
                                        color : theme.palette.white
                                    },
                                    circle : {
                                        height : '80px',
                                        width : '80px'
                                    }   
                                }} 
                                label={loadingState?.loadingText} 
                                size={SpinnerSize.large} />
                            </Stack.Item>
                        </Stack>
                    </div>;

    return (
        <>
            { loadingState?.loading && <Layer>{content}</Layer>}
        </>
    );
}