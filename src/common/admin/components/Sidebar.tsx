import { getTheme, INavLink, INavLinkGroup, INavStyles, Nav } from '@fluentui/react';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import AppContext from '../../config/app-context.config';

const theme = getTheme();

const navStyles: Partial<INavStyles> = {
    root: {
        width: 220,
        minHeight: '80vh',
        boxSizing: 'border-box',
        border: 'none',
        overflowY: 'auto',
        background : 'rgb(243 242 241)',
        color : 'black'
    },
};

export const AdminSidebar: React.FunctionComponent<{}> = (props) => {
    const navigate = useNavigate();
    const username = AppContext.getInstance()?.context?.pageContext?.user?.displayName

    const navLinkGroups: INavLinkGroup[] = [
        {
            links: [
                {
                    name: username,
                    url : '#', 
                    expandAriaLabel: 'Expand Home section',
                    collapseAriaLabel: 'Collapse Home section',
                    //iconProps: { iconName: 'Home' },
                    links: [
                        {
                            name: 'Dashboard',
                            url: '#',
                            customUrl : '/admin/home',
                            key: 'key1',
                            target: '_blank',
                            iconProps: { iconName: 'GlobalNavButton' },
                        },
                        {
                            name: 'Resource Access',
                            url: '#',
                            customUrl : '/admin/resources-group',
                            key: 'key1',
                            target: '_blank',
                            iconProps: { iconName: 'UserWarning' },
                        },
                        {
                            name: 'User Roles',
                            url: '#/admin/home',
                            key: 'key1',
                            target: '_blank',
                            iconProps: { iconName: 'UserFollowed' },
                        },
                        {
                            name: 'User Groups',
                            url: '#/admin/home',
                            key: 'key1',
                            target: '_blank',
                            iconProps: { iconName: 'SecurityGroup' },
                        },
                       
                    ],
                    isExpanded: true,
                } 
            ],
        },
    ];

    const _onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink)  => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();

        item?.customUrl && navigate(item?.customUrl, { replace: true }); 
    }

    return (
        <>
            <Nav
                onLinkClick={_onLinkClick}
                selectedKey="key3"
                ariaLabel="Nav basic example"
                styles={navStyles}
                groups={navLinkGroups}
                
            />
        </>
    );
}