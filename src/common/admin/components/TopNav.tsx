import { CommandBar, IButtonProps, ICommandBarItemProps, ICommandBarStyles } from '@fluentui/react';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };
const navStyles: Partial<ICommandBarStyles> = {
    root: {
        // width: '100%',  
        // background : 'rgb(243 242 241)' 
    },
};

export const AdminTopNav: React.FunctionComponent<{}> = (props) => {
    const navigate = useNavigate();
    const handleOnClick = React.useCallback(() => navigate('/admin/home', { replace: true }), [navigate]);
    const _items: ICommandBarItemProps[] = [
        {
            key: 'home',
            text: 'Home',
            iconProps: { iconName: 'Home' },
            split: true,
            ariaLabel: 'Admin Home',
            splitButtonAriaLabel: 'More',
            onClick: handleOnClick,
            subMenuProps: {
                items: [
                    { 
                        key: 'examples', 
                        text: 'Example', 
                        iconProps: { iconName: 'TextDocument' },
                        onClick : () => navigate('/', { replace: true })
                     },
                    { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
                ],
            },
        }
    ];
    return (
        <>
            <CommandBar
                items={_items}
                overflowButtonProps={overflowButtonProps}
                styles = {navStyles}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />
        </>
    );
}