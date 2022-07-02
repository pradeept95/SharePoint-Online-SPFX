import { IStackTokens, mergeStyleSets, PrimaryButton, Stack } from '@fluentui/react';
import { DefaultButton } from 'office-ui-fabric-react';
import * as React from 'react'
import { useEffect } from 'react';
import { useAlertService } from '../service/useAlertService';
import { LoadingExample } from './LoadingExample';

export const AlertExample: React.FunctionComponent<{}> = (props) => {
    const alert = useAlertService();

    const success = () => {
        alert.success("This is success Message")
    }
    const error = () => {
        alert.error(<>Hello This is Error Component</>)
    }
    const info = () => {
        alert.info(<><LoadingExample /></>)
    }
    const warning = () => {
        alert.warning("This is success Message")
    }
    const dark = () => {
        alert.dark("This is success Message")
    }

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

    return (
        <>
            <Stack horizontal tokens={gapStackTokens}>
                <Stack.Item className={classNames.inputItem25}>
                    <PrimaryButton text="Success" onClick={success} />
                </Stack.Item>
                <Stack.Item className={classNames.inputItem25}>
                    <DefaultButton text="Info" onClick={info} />
                </Stack.Item>
                <Stack.Item className={classNames.inputItem25}>
                    <DefaultButton text="Warning" onClick={warning} />
                </Stack.Item>
                <Stack.Item className={classNames.inputItem25}>
                    <PrimaryButton text="Dark" onClick={dark} />
                </Stack.Item>
                <Stack.Item className={classNames.inputItem25}>
                    <DefaultButton text="Error" onClick={error} />
                </Stack.Item>
            </Stack>
        </>
    );
}