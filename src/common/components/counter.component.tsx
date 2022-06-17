import * as React from 'react';
import { useState } from 'react';
import { getSP } from '../config/pnpjs.config';
import AppContext from '../config/app-context.config';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IStackTokens, Stack } from 'office-ui-fabric-react';

export interface ITestCounterProps {
  count?: number
}

export const Counter: React.FunctionComponent<ITestCounterProps> = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

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

      // get all the items from a list
      const items: any[] = await sp.web.lists.getByTitle("MyFirstListSPFX").items();
      console.log(items);

      // get a specific item by id.
      const item: any = await sp.web.lists.getByTitle("MyFirstListSPFX").items.getById(1)();
      console.log(item);

      // use odata operators for more efficient queries
      const items2: any[] = await sp.web.lists.getByTitle("MyFirstListSPFX").items.select("Title", "ID").top(5).orderBy("Modified", true)();
      console.log(items2);

      context.context.pageContext.web.permissions

      const permission = context.context.pageContext.web.permissions;
      setList(items);

    } catch (error) {
      debugger;
    }


  }

  const stackTokens: IStackTokens = { childrenGap: 40 };

  return (
    <div>
      <p>You clicked {count} times, {userName}.</p>
      <Stack horizontal tokens={stackTokens}>
        <PrimaryButton text="Increase Count" onClick={() => setCount(count + 1)} />
        <PrimaryButton text="Make API Call" onClick={() => callApi()} />
      </Stack>
      <ul>
        {list.map(item => <li key={item?.id}> {item?.Title} </li>)}
      </ul>
    </div>
  );
};



