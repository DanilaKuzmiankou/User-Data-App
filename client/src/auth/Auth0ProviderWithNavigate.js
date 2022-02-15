import {Auth0Provider} from '@auth0/auth0-react'
import {Children} from '../types/index.d'


const domain = REACT_APP_AUTH0_DOMAIN;
const clientId = REACT_APP_AUTH0_CLIENT_ID;
const audience = REACT_APP_AUTH0_AUDIENCE;


const Auth0ProviderWithNavigate = ({children}: Children) => {

    const onRedirectCallback = appState => {
        window.location.href = "/users"

    };


    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            audience={audience}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}


export default Auth0ProviderWithNavigate
