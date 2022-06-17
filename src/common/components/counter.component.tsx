import * as React from 'react';
import { useState } from 'react';
import { getSP } from '../config/pnpjs.config';
import AppContext from '../services/app-context.service';

export interface ITestCounterProps {
  count?: number
}

export const Counter: React.FunctionComponent<ITestCounterProps> = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  const context = AppContext.getInstance();

  const userName = context.context.pageContext.user.displayName;

  const callApi = async (): Promise<void> => {

    const sp = await getSP()

    // const [batchedSP, execute] = sp.batched();

    // let res = [];

    // // you need to use .then syntax here as otherwise the application will stop and await the result
    // batchedSP.web().then(r => res.push(r));

    // // you need to use .then syntax here as otherwise the application will stop and await the result
    // // ODATA operations such as select, filter, and expand are supported as normal 
    // batchedSP.web.lists.getByTitle("Items").select("Title")().then(r => res.push(r));

    // // Executes the batched calls
    // await execute();

    // // Results for all batched calls are available
    // for(let i = 0; i < res.length; i++) {
    //   ///Do something with the results
    //   //console.log(res[i])
    // }

    try {
      const items = await sp.web.lists.getByTitle("MyFirstListSPFX").items();
      debugger;
      console.log(items)

    } catch (error) {
      debugger;
    }


  }

  return (
    <div>
      <p>You clicked {count} times, {userName}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>

      <button onClick={() => callApi()}>
        Call Service
      </button>
    </div>
  );
};



