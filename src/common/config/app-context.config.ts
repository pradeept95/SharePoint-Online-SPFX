import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISiteSettingProps } from "../settings/SiteSettingsProps";
import { getGraphFi, getSP } from "./pnpjs.config";

class AppContext {
    private static instance: AppContext;

    public context : WebPartContext
    public siteSettings? : ISiteSettingProps
  
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
        await getGraphFi(this.context);
    } 

    public async addSetting(siteSettings : ISiteSettingProps){
      this.siteSettings = siteSettings; 
  } 
}

export default AppContext;