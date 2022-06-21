import * as React from 'react';  
import { Outlet } from "react-router-dom"

const Layout : React.FunctionComponent = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout