import { ISiteGroupInfo } from "@pnp/sp/site-groups";
import { ISiteUserInfo } from "@pnp/sp/site-users";
import { getSP } from "../../config/pnpjs.config";


export const useSecurityGroupService = () => {
    (async () => { })();

    const getServiceGroupList = async (): Promise<ISiteGroupInfo[]> => {
        try {
            const sp = await getSP();

            const response = await sp.web.siteGroups();
            const result = response.filter(x => x?.LoginName.indexOf("test") > -1);
            console.log("getServiceGroupList -> success", result);
            return result;

        } catch (error) {

            console.log("getServiceGroupList -> error", error);
            throw error;
        }
    };

    const getServiceGroupById = async (groupID: number): Promise<ISiteGroupInfo> => {
        try {
            const sp = await getSP();
            // get the group using a group id
            const groupDetails = await sp.web.siteGroups.getById(groupID)();
            return groupDetails;

        } catch (error) {
            console.log("getTicketsFromList -> error", error);
            throw error;
        }
    };

    const createServiceGroup = async (groupName: string) => {
        try {
            const sp = await getSP();
            // Creates a new site group with the specified title
            await sp.web.siteGroups.add({ "Title": groupName });

        } catch (error) {
            console.log("createServiceGroup -> error", error);
            throw error;
        }
    }

    const removeServiceGroup = async (groupID: number) => {
        try {
            const sp = await getSP();
            // delete a group from the site using group id
            await sp.web.siteGroups.removeById(groupID);

        } catch (error) {
            console.log("createServiceGroup -> error", error);
            throw error;
        }
    }

    const getAllUsersInSecurityGroup = async (groupID: number): Promise<ISiteUserInfo[]> => {
        try {
            const sp = await getSP();
            // get all users of group 
            const users = await sp.web.siteGroups.getById(groupID).users();
            return users;
        } catch (error) {
            console.log("getAllUsersInSecurityGroup -> error", error);
            throw error;
        }
    }

    const addUserToGroup = async (groupID: number, loginName : string) => {
        try {
            const sp = await getSP();
            // delete a group from the site using group id
            await sp.web.siteGroups.getById(groupID).users.add(loginName);

        } catch (error) {
            console.log("createServiceGroup -> error", error);
            throw error;
        }
    }

    const removeUserFromGroup = async (groupID: number, userId : number) => {
        try {
            const sp = await getSP();
            // delete a group from the site using group id
            await sp.web.siteGroups.getById(groupID).users.removeById(userId);

        } catch (error) {
            console.log("createServiceGroup -> error", error);
            throw error;
        }
    }

    return {
        getServiceGroupList,
        getServiceGroupById,
        createServiceGroup,
        removeServiceGroup,

        getAllUsersInSecurityGroup,
        addUserToGroup,
        removeUserFromGroup

    };
};