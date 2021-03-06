import React from "react";
import {BrowserRouter} from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import {AppRoutes} from './router/AppRoutes'
import {CustomNav} from "./components/index.components";

const App = () => {


    return (
        <BrowserRouter>
            <div className='app'>
                <Auth0ProviderWithNavigate>
                    <CustomNav/>
                    <AppRoutes/>
                </Auth0ProviderWithNavigate>
            </div>
        </BrowserRouter>
    );
};

export default App;
