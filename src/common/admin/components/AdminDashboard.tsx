import * as React from 'react'
import AppContext from '../../config/app-context.config';
import { FormExample } from '../../examples';

export const AdminDashboard: React.FunctionComponent<{}> = (props) => {
    const context = AppContext.getInstance();
    return (
        <>
            <div className='content' style={{ maxWidth: '100%' }}>
                <h3>Welcome {context?.context?.pageContext?.user?.displayName}</h3>
                <hr />
                {/* <FormExample /> */}
            </div>
        </>
    );
}