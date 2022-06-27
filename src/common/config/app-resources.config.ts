export class ApplicationResources {
    private static instance: ApplicationResources;
    resources : Array<ResourceItem>; 
  
    private constructor() {}
  
    public static getInstance(): ApplicationResources {
      if (!ApplicationResources.instance) {
        ApplicationResources.instance = new ApplicationResources();
      } 
      return ApplicationResources.instance;
    }

    public async initializeResourceItem(){
        this.resources = new Array<ResourceItem>();
    } 

    addAppResourceItem(resource : ResourceItem, parentName : string = ""){
        if(!this.resources){
            throw "Applicaiton Resources is not Initialize, consider calling  ApplicationResources.getInstance().initializeResourceItem() at the top of the application";
        }
        try {
            
        } catch (error) {
            
        }

    }

    getAppResources() {
        if(!this.resources){
            throw "Applicaiton Resources is not Initialize, consider calling  ApplicationResources.getInstance().initializeResourceItem() at the top of the application";
        }
        return this.resources;
    }
}


export class ResourceItem {
    resourceName : string;
    childResource : Array<ResourceItem>

    constructor(){
        this.childResource = new Array<ResourceItem>();
    }
}