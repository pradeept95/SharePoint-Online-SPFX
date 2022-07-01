import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import {  SPFx as graphSPFx , GraphFI, graphfi }  from "@pnp/graph"

import "@pnp/graph/presets/all"; 
import "@pnp/graph"; 
import "@pnp/graph/users"; 
import "@pnp/sp/presets/all"


var _SP: SPFI = null;
var _GraphFI: GraphFI = null;

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

export const getGraphFi = async (context?: WebPartContext): Promise<GraphFI> => {
    // initialize if _SP is null and Context is provided
    if (_GraphFI === null && (context !== null || context !== undefined)) {

        // Set sp as the global variable so we don't have to pass webpartcontext deep down to the child component
        // initialize once at init 
        _GraphFI = graphfi().using(graphSPFx(context));

    }

    return new Promise((resolve, reject) => { 
        if (_GraphFI) resolve(_GraphFI);
        else reject("GraphFi is Not Initialized"); 
    }); 
}