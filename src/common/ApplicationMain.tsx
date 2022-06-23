import * as React from "react"; 
import AppContext from "./config/app-context.config";
import { Routes, Route } from 'react-router-dom';  
import { useEffect } from "react";
import { Admin } from "./admin/Admin"; 
import { Counter, FormExample, Home, LoadingExample } from "./examples";
import { useAuth } from "./hooks";
import { RequireAuth, ROLES } from "./auth";
import { AdminLayout, MainLayout } from "./components/layouts";
import { AccessDenied, PageNotFound } from "./components";

const ApplicationMain: React.FunctionComponent<{}> = (props) => {

  const { setAuth } = useAuth();
  useEffect(() => {
    const currrentContext = AppContext.getInstance();

    setAuth({
      user: currrentContext.context.pageContext.user,
      roles: [ROLES.User, ROLES.Admin]
    });
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