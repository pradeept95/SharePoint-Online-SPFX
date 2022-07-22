import * as React from 'react';
import { ISiteGroupInfo } from '@pnp/sp/site-groups';
import { useSecurityGroupService } from '../../services';
import { ISiteUserInfo } from '@pnp/sp/site-users';
import { DefaultButton, DetailsList, DetailsListLayoutMode, IPersonaProps, Link, PrimaryButton, ProgressIndicator, SelectionMode, Stack, TextField } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import AppContext from '../../../config/app-context.config';
import { PeoplePicker } from '../../../components/people-picker/PeoplePicker';

export const ManageSecurityGroup: React.FunctionComponent<{
  securityGroup: ISiteGroupInfo,
  panelMode: 'edit' | 'create' | 'view',
  dismissPanel: () => any
}> = ({ securityGroup, panelMode, dismissPanel }) => {

  const [groupUsers, setGroupUsers] = React.useState<ISiteUserInfo[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<IPersonaProps[]>([]);
  const [loading, { setTrue: showLoading, setFalse: hideLoading }] = useBoolean(false);

  const { getAllUsersInSecurityGroup, addUserToGroup, removeUserFromGroup, createServiceGroup } = useSecurityGroupService();

  const [groupName, setGroupName] = React.useState("");
  const createSecurityGroup = async () => {
    console.log(groupName)
    await createServiceGroup(groupName);
  }

  const getAllUsers = async () => {
    showLoading();
    const users = await getAllUsersInSecurityGroup(securityGroup?.Id);
    setGroupUsers(users);
    hideLoading();
  }

  const deleteUser = async (user: ISiteUserInfo) => {
    console.log(user);
    await removeUserFromGroup(securityGroup?.Id, user?.Id)
    await getAllUsers();
  }

  const addNewUser = async () => {
    console.log();
    showLoading();
    for (let index = 0; index < selectedUsers.length; index++) {
      const user = selectedUsers[index]; 
      await addUserToGroup(securityGroup?.Id, user?.tertiaryText); // tertiaryText is an login Name 
    }
    await getAllUsers(); 
    setSelectedUsers([]);
    hideLoading();
  }

  React.useEffect(() => {
    if (['edit', 'view'].indexOf(panelMode) > -1) {
      getAllUsers();
    }
  }, []);

  const _columns = [
    { key: 'name', name: 'User Name', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'email', name: 'User Email', fieldName: 'Email', minWidth: 100, maxWidth: 200, isResizable: true },
    {
      key: 'remove',
      name: 'Action',
      fieldName: 'LoginName',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ISiteUserInfo) => {
        return <Link onClick={async () => await deleteUser(item)}>Remove User</Link>;
      },
    },
  ];

  const onChangeTrigger = async (peoples: IPersonaProps[]) => {
    // const users : ISiteUserInfo[] = peoples.map(ppl => {
    //   return {
    //     Id : +ppl?.id,
    //     Title: ppl?.text,
    //     Email : ppl.secondaryText,
    //     LoginName : ppl.tertiaryText 
    //   } as ISiteUserInfo;
    // })
    setSelectedUsers(peoples);
    console.log("onChangeTrigger", peoples);
  };

  const appContext = AppContext.getInstance();

  const CreateSecurityGroupContent = <>
    <TextField
      name="address"
      label="Address"
      onChange={($event, newValue) => setGroupName(newValue)}
      value={groupName}
      // errorMessage={ getErrorMessage("address") }
      placeholder="Enter Group Name..."
    />
    <p>* Your group name will be {groupName}.</p>
    <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
      <PrimaryButton onClick={() => createSecurityGroup()}>Create Security Group</PrimaryButton>
      <DefaultButton onClick={() => dismissPanel()} split>Cancel</DefaultButton>
    </Stack>
  </>;

  return (
    <>

      {
        ['edit', 'view'].indexOf(panelMode) > -1 ?
          <>
            {loading && <ProgressIndicator />}

            <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
              {/* <PeoplePicker
                context={appContext.context}
                //titleText="Select an User"
                personSelectionLimit={1} 
                // Leave this blank in case you want to filter from all users
                groupName={""}
                showtooltip={true}
                required={true}
                disabled={false}
                onChange={(peoples : IPersonaProps[]) => {
                  console.log(peoples)
                  const emails = peoples.map(x => x?.secondaryText)?.join(";")
                  const names = peoples.map(x => x?.text)?.join(";")
                  //formik.setFieldValue('profile', emails, false);
                  //formik.setFieldValue('fullname', names, true);
                }}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={500}
                placeholder="Please type at least 3 character to search user..."
                //errorMessage={getErrorMessage("profile")}
              /> */}
              <PeoplePicker 
                onPeopleSelectChange={onChangeTrigger}
                defaultSelectedUsers={selectedUsers}
                principalTypes={[PrincipalType.User, PrincipalType.SecurityGroup]}
                peoplePickerType="List" 
                placeholder="Enter name or email to search user"
                required={true} 
                showSecondaryText={false}
                personSelectionLimit={30} 
                description="Select User and Click on Add User to Save in the group."
                disabled={false}
                readOnly={false}
                style = {
                  {
                    minWidth : 300
                  }
                }>

              </PeoplePicker>
              <PrimaryButton onClick={() => addNewUser()} disabled={ selectedUsers.length < 1}>Add User</PrimaryButton>
            </Stack>

            <DetailsList
              selectionMode={SelectionMode.none}
              items={groupUsers}
              columns={_columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
            />
            {!groupUsers?.length && !loading && <p>No Data to Display</p>}
          </>
          : CreateSecurityGroupContent
      }
    </>
  );
};


