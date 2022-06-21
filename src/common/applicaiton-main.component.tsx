import * as React from "react";
import { Counter } from "./components";
import AppContext from "./config/app-context.config";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PageNotFound from "./components/page-not-found/page-not-found.component";
import AccessDenied from "./components/access-denied/access-denied.component";
import { CommandBar, IButtonProps, ICommandBarItemProps } from "@fluentui/react";
import { FormExample } from "./examples/forms/forms.component";
import { LoadingSpinner } from "./components/spinner/spinner.component";
import Layout from "./components/layouts/layout.component";
import { ROLES } from "./auth/roles";
import RequireAuth from "./auth/require-auth.component";
import useAuth from "./auth/auth-provider.hooks";
import { useEffect } from "react";

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };

const ApplicationMain: React.FunctionComponent<{}> = (props) => {

  const navigate = useNavigate();
  const handleOnClick = React.useCallback(() => navigate('/form-example', { replace: true }), [navigate]);
  const _items: ICommandBarItemProps[] = [
    {
      key: 'formExample',
      text: 'Form Example',
      iconProps: { iconName: 'Add' },
      split: true,
      ariaLabel: 'Form Example',
      splitButtonAriaLabel: 'More New options',
      onClick: handleOnClick,
      subMenuProps: {
        items: [
          { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
          { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
        ],
      },
    },
    {
      key: 'upload',
      text: 'Upload',
      iconProps: { iconName: 'Upload' },
      split: true,
      ariaLabel: 'Upload',
      splitButtonAriaLabel: 'More Upload options',
      disabled: false,
      href: 'https://developer.microsoft.com/en-us/fluentui',
      target: '_blank',
      subMenuProps: {
        items: [
          { key: 'item1', text: 'Item One' },
          { key: 'item2', text: 'Item Two' },
        ],
      },
    },
    {
      key: 'share',
      text: 'Share',
      iconProps: { iconName: 'Share' },
      disabled: false,
    },
    {
      key: 'download',
      text: 'Download',
      ariaLabel: 'Download',
      iconProps: { iconName: 'Download' },
      iconOnly: true,
      disabled: false,
    },
  ];

  const { setAuth } = useAuth();

  useEffect(() => {
    const currrentContext = AppContext.getInstance();

    setAuth({
      user: currrentContext.context.pageContext.user,
      roles: [ROLES.User]
    });
  }, [])

  return (
    <>
      <section className="default">
        <LoadingSpinner />
      </section>
      <section className="header">
        <CommandBar
          items={_items}
          overflowButtonProps={overflowButtonProps}
          ariaLabel="Use left and right arrow keys to navigate between commands"
        />
        <Link to="/">Welcome</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/page-not-found">No page</Link>
      </section>
      <section className="body">

        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/unauthorized' element={<AccessDenied />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path='/form-example' element={<FormExample />} /> 
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> 
              <Route path='/counter' element={<Counter />} />
            </Route>

            {/* catch all */}
            <Route path='/page-not-found' element={<PageNotFound />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </section>
      <section className="footer">Footer</section>
    </>
  );
};

export default ApplicationMain;


const Home = () => {
  return (
    <>
      <h1>Welcome to the Application</h1>
    </>
  )
}

