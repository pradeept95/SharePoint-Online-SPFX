import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items"
import "@pnp/sp/batching"


var _SP: SPFI = null;

export const getSP = async (context?: WebPartContext): Promise<SPFI> => {
    // initialize if _SP is null and Context is provided
    if (_SP === null && (context !== null || context !== undefined)) {

        // Set sp as the global variable so we don't have to pass webpartcontext deep down to the child component
        // initialize once at init 
        _SP = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Error));
    }

    return new Promise((resolve, reject) => { 
        if (_SP) resolve(_SP);
        else reject("PnpSP is Not Initialized"); 
    }); 
}