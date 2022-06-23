import { CommandBar, IButtonProps, ICommandBarItemProps } from '@fluentui/react';
import * as React from 'react';  
import { Outlet, useNavigate } from "react-router-dom"

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };

export const MainLayout : React.FunctionComponent = () => {
    const navigate = useNavigate();
    const handleOnClick = React.useCallback(() => navigate('/form-example', { replace: true }), [navigate]);
    const _items: ICommandBarItemProps[] = [
      {
        key: 'example',
        text: 'Home',
        iconProps: { iconName: 'Home' },
        split: true,
        ariaLabel: 'Home',
        splitButtonAriaLabel: 'More New options',
        onClick: () => navigate('/', { replace: true }),
        subMenuProps: {
          items: [
            { 
              key: 'formExample', 
              text: 'Form Example', 
              iconProps: { iconName: 'OfficeFormsLogoInverse16' }, 
              onClick: () => navigate('/form-example', { replace: true }),
            },
            { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
          ],
        },
      },
      {
        key: 'loading',
        text: 'Loading Example',
        iconProps: { iconName: 'Sync' },
        split: true,
        ariaLabel: 'Loading',
        onClick : () => navigate('/loading', { replace: true })  
         
      },
      {
        key: 'counter',
        text: 'Coutner',
        iconProps: { iconName: 'Rotate90CounterClockwise' },
        disabled: false,
        onClick : () => navigate('/counter', { replace: true })  
      }, 
    ];

    const _farItems: ICommandBarItemProps[] = [
      {
        key: 'setting',
        text: 'Admin',
        ariaLabel: 'Admin',
        iconProps: { iconName: 'Settings' },
        iconOnly: true,
        disabled: false,
        onClick : () => navigate('/admin/home', { replace: true })  
      }
    ];
    
    return (
        <main className="App">
            <CommandBar
              items={_items}
              farItems={_farItems}
              overflowButtonProps={overflowButtonProps}
              ariaLabel="Use left and right arrow keys to navigate between commands"
            />
            <Outlet />
        </main>
    )
}