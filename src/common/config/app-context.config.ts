import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjs.config";

class AppContext {
    private static instance: AppContext;

    public context : WebPartContext
  
    private constructor() {}
  
    public static getInstance(): AppContext {
      if (!AppContext.instance) {
        AppContext.instance = new AppContext();
      }
      return AppContext.instance;
    }

    public async initialize(context : WebPartContext){
        this.context = context;
        await getSP(this.context);
    } 
}

export default AppContext;