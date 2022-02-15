import axios from "axios";

export function getSecretRequest(bearer: string, url: string) {
    const promise = axios
        .get(`${REACT_APP_SERVER_URL}${url}`, {

            headers: {
                Authorization: `Bearer ${bearer}`
            }

        })

    return promise.then((response) => response.data);
}

export function postSecretRequest(bearer: string, url: string, body: string) {
    const promise = axios
        .post(`${REACT_APP_SERVER_URL}${url}`, body, {
            headers: {
                Authorization: `Bearer ${bearer}`,
                'Content-Type': 'application/json'
            }
        })
    return promise.then((response) => response.data);
}