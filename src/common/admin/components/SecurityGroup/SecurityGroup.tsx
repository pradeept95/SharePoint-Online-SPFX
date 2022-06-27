import { ActionButton, Customizer, DetailsList, DetailsListLayoutMode, IconButton, IFocusTrapZoneProps, ILayerProps, Panel, PanelType, SelectionMode } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { ISiteGroupInfo } from '@pnp/sp/site-groups';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useSecurityGroupService } from '../../services';
import { ManageSecurityGroup } from './ManageSecurityGroup';



export const SecurityGroup: React.FunctionComponent<{}> = (props) => {

    const [securityGroups, setSecurityGroups] = useState<ISiteGroupInfo[]>([]);
    const [selectedSecurityGroup, setSelectedSecurityGroup] = useState<ISiteGroupInfo>(null);
    const [isPanelOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [panelMode, setPanelMode] = useState<'edit' | 'create' | 'view'>("edit");

    const { getServiceGroupList } = useSecurityGroupService()

    const getAllSecurityGroup = async () => {
        const securityGroups = await getServiceGroupList();
        setSecurityGroups(securityGroups);
        console.log(securityGroups);
    }

    const itemClicked = async (item: ISiteGroupInfo) => {
        console.log(item);
        setSelectedSecurityGroup(item);
        setPanelMode("edit");
        openPanel();
    }

    const createSecurityGroup = async () => {
        setSelectedSecurityGroup(null);
        setPanelMode("create");
        openPanel();
    }

    useEffect(() => {
        getAllSecurityGroup();
    }, []);

    const _columns = [
        { key: 'name', name: 'Name', fieldName: 'LoginName', minWidth: 100, maxWidth: 200, isResizable: true },
        {
            key: 'manage',
            name: 'Manage',
            fieldName: 'LoginName',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
            onRender: (item: ISiteGroupInfo) => {
                return <PrimaryButton onClick={async () => await itemClicked(item)}>Manage Group</PrimaryButton>;
            },
        },
    ];

    return (
        <>
            <h3>Manage Security Group</h3>
            <ActionButton iconProps={{ iconName: 'AddFriend' }} onClick={() => createSecurityGroup()}>
                Create Security Group
            </ActionButton> 
            <hr />
            <div className='pageMainArea'>
                <DetailsList
                    selectionMode={SelectionMode.none}
                    items={securityGroups}
                    columns={_columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    onItemInvoked={itemClicked} 
                />
            </div>

            <Panel
                headerText={selectedSecurityGroup ? `Manage ${selectedSecurityGroup?.LoginName}` : "Create New Security Group"}
                isOpen={isPanelOpen}
                onDismiss={dismissPanel}
                type={PanelType.medium}
                closeButtonAriaLabel="Close"
            >
                <ManageSecurityGroup
                    securityGroup={selectedSecurityGroup}
                    panelMode={panelMode}
                    dismissPanel = {dismissPanel}>

                </ManageSecurityGroup>
            </Panel>

        </>
    );
}