import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import { AdminDashboard, AdminSidebar, AdminTopNav } from './components';

export const Admin: React.FunctionComponent<{}> = (props) => {
    return (
        <>
            <section className='admin-sidebar'>
                <AdminSidebar />
            </section>
            <section className='admin-main'>
                <section className='admin-nav'>
                    <AdminTopNav />
                </section>
                <section className='admin-dashboard'>
                    <Routes>
                        <Route path='/dashboard' element={<AdminDashboard />} />
                    </Routes>
                </section>
            </section>
        </>
    );
}