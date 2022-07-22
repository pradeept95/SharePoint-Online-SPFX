import * as React from "react"; 
import AppContext from "../config/app-context.config";

export const Home : React.FunctionComponent = () => {
  const context = AppContext.getInstance();
    return (
      <>
       <h3>Welcome {context?.context?.pageContext?.user?.displayName}</h3>
       <hr />
      </>
    )
  }