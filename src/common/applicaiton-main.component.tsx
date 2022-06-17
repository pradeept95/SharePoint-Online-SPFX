import * as React from "react";
import { Counter } from "./components";
import AppContext from "./config/app-context.config";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PageNotFound from "./components/page-not-found/page-not-found.component";
import AccessDenied from "./components/access-denied/access-denied.component";
import { CommandBar, IButtonProps, ICommandBarItemProps } from "@fluentui/react";

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };

const ApplicationMain: React.FunctionComponent<{}> = (props) => {

    const context = AppContext.getInstance();
    const navigate = useNavigate();
    const handleOnClick = React.useCallback(() => navigate('/sample', {replace: true}), [navigate]);
    const _items: ICommandBarItemProps[] = [
        {
          key: 'newItem',
          text: 'New',
          iconProps: { iconName: 'Add' },
          split: true,
          ariaLabel: 'New',
          splitButtonAriaLabel: 'More New options',
          onClick : handleOnClick, 
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

    return (
        <>
            <section className="header">
                <CommandBar
                    items={_items}
                    overflowButtonProps={overflowButtonProps}
                    ariaLabel="Use left and right arrow keys to navigate between commands"
                />
                <Link to="/">Counter</Link>
                <Link to="/no-access">Welcome</Link>
                <Link to="/no-available">No page</Link>
            </section>
            <section className="body">
                <Routes>
                    <Route path='/' element={<Counter />} />
                    <Route path='/no-access' element={<AccessDenied />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </section>
            <section className="footer">Footer</section>
        </>
    );
};

export default ApplicationMain;

