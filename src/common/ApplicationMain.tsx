import * as React from "react";
import AppContext from "./config/app-context.config";
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { Admin } from "./admin/Admin";
import { Counter, FormExample, GridExample, Home, LoadingExample } from "./examples";
import { useAuth } from "./hooks";
import { RequireAuth, ROLES } from "./auth";
import { AdminLayout, MainLayout } from "./components/layouts";
import { AccessDenied, PageNotFound } from "./components";
import { initializeIcons } from "@fluentui/react";
import { setIconOptions } from '@fluentui/react/lib/Styling';
import { getSP } from "./config/pnpjs.config"; 

const ApplicationMain: React.FunctionComponent<{}> = (props) => {

  const { setAuth } = useAuth(); 

  const callApi = async (): Promise<void> => {

    const sp = await getSP()

    // Using RowLimit. Enables paging
    const a = await sp.web.lists.getByTitle("MyFirstListSPFX").getListItemChangesSinceToken({ RowLimit: '5' });

    // Use QueryOptions to make a XML-style query.
    // Because it's XML we need to escape special characters
    // Instead of & we use &amp; in the query
    const b = await sp.web.lists.getByTitle("MyFirstListSPFX").getListItemChangesSinceToken({ QueryOptions: '<Paging ListItemCollectionPositionNext="Paged=TRUE&amp;p_ID=5" />' });

    // Get everything. Using null with ChangeToken gets everything
    const c = await sp.web.lists.getByTitle("MyFirstListSPFX").getListItemChangesSinceToken({ ChangeToken: null });

  }  


  useEffect(() => {
    const currrentContext = AppContext.getInstance();

    setAuth({
      user: currrentContext.context.pageContext.user,
      roles: [ROLES.User, ROLES.Admin]
    });

    initializeIcons();
    // Suppress icon warnings.
    setIconOptions({
      disableWarnings: true
    });

    callApi();

  }, [])

  

  return (
    <>
      <section className="body">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* public routes */}
            <Route path='/' element={<Home />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path='/form-example' element={<FormExample />} />
              <Route path='/counter' element={<Counter />} />
              <Route path='/loading' element={<LoadingExample />} />
              <Route path='/datatable' element={<GridExample />} />
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='/admin/*' element={<Admin />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path='/unauthorized' element={<AccessDenied />} />
          <Route path='/page-not-found' element={<PageNotFound />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </section>
    </>
  );
};

export default ApplicationMain;