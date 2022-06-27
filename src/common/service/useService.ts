import { getSP } from "../config/pnpjs.config";

export const useSecurityGroupService = () => {
    (async () => { })();

    const getServiceGroupList = async (): Promise<any[]> => {
        try {
            const sp = await getSP();

            const list = sp.web.lists.getByTitle('MyFirstListSPFX');
            const response : any[] = await list.items.select("Title", "ID").top(5).orderBy("Modified", true)();
            console.log("getServiceGroupList -> success", response);
            return response;

        } catch (error) {

            console.log("getServiceGroupList -> error", error);
            throw error;
        }
    };

    const getServiceGroupById = async (itemId: number): Promise<any[]> => {
        try {
            const sp = await getSP();

            const list = sp.web.lists.getByTitle('MyFirstListSPFX');
            const ticketResponse: any = await list.items.getById(+itemId).select("Title", "ID")();
            console.log("getTicketsFromList -> ticketResponse", ticketResponse);
            return ticketResponse;
        } catch (error) {
            console.log("getTicketsFromList -> error", error);
            throw error;
        }
    };

    return {
        getServiceGroupList,
        getServiceGroupById
    };
};