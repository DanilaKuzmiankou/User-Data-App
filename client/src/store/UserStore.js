import {getSecretRequest, postSecretRequest} from "../api/index.network";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone" // dependent on utc plugin
import moment from "moment-timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export async function registerNewUser(token: string, email: string, name: string) {
    let body = JSON.stringify({email: email, name: name})
    return await postSecretRequest(token, '/api/user/register', body)
}

export async function postDeleteUser(token: string, email: Array) {
    let body = JSON.stringify(email)
    let data = await postSecretRequest(token, '/api/user/delete', body)
    return await changeDateToUserTimezone(data)
}

export async function postBlockUser(token: string, email: Array) {
    let body = JSON.stringify(email)
    let data = await postSecretRequest(token, '/api/user/block', body)
    return await changeDateToUserTimezone(data)
}

export async function postUnblockUser(token: string, email: Array) {
    let body = JSON.stringify(email)
    let data = await postSecretRequest(token, '/api/user/unblock', body)
    return await changeDateToUserTimezone(data)
}

async function changeDateToUserTimezone(users: Array) {


    return users
}

function formatTime(date: Date, timeZone: string) {
    let time = moment.tz(date, timeZone)
    return time.format(process.env.REACT_APP_DATESTRING_FORMAT) /* timezone_string = "Australia/Sydney" */
}

export async function getAllUsers(token: string) {
    let data = await getSecretRequest(token, '/api/user/users')
    return await data
}