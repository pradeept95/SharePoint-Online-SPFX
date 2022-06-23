import { CommandBar, IButtonProps, ICommandBarItemProps, IStackProps, IStackStyles, Separator, Stack } from '@fluentui/react';
import * as React from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import { AdminSidebar, AdminTopNav } from '../../admin/components';

const stackTokens = { childrenGap: 5 };
const stackStyles: Partial<IStackStyles> = { root: { width: '100%', marginTop: '10px' } };
const sideNavProp: Partial<IStackProps> = {
  tokens: { childrenGap: 5 },
  styles: { root: { width: 220, minHeight: '30vh' } },
};

const mainAreaProp: Partial<IStackProps> = {
  tokens: { childrenGap: 5 },
  styles: { root: { width: '100%', minHeight: '30vh' } },
};

export const AdminLayout: React.FunctionComponent = () => {

  return (
    <main className="App"> 
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...sideNavProp}>
          <AdminSidebar />
        </Stack>
        <Stack {...mainAreaProp}>
          <AdminTopNav />
          <Separator></Separator>
          <Outlet />
        </Stack>
      </Stack>
    </main>
  )
}