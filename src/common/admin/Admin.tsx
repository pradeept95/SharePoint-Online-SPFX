import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../components';
import { AdminDashboard, SecurityGroup } from './components';

export const Admin: React.FunctionComponent<{}> = (props) => {
    return (
        <>
            <Routes>
                <Route path='/home' element={<AdminDashboard />} />
                <Route path='/security-group' element={<SecurityGroup />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    );
}