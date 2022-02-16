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
    let clientTimeZone = dayjs.tz.guess()
    for (let i = 0; i < users.length; i++) {
        let c = formatTime(new Date(users[i].updatedAt), clientTimeZone)
        let d = users[i].updatedAt
        console.log(c)
        console.log(d)
        console.log(typeof c)
        console.log(typeof d)
        users[i].updatedAt = formatTime(new Date(users[i].updatedAt), clientTimeZone)
        users[i].createdAt = formatTime(new Date(users[i].createdAt), clientTimeZone)
    }
    return users
}

function formatTime(date: Date, timeZone: string) {
    let time = moment.tz(date, timeZone)
    return time.format(process.env.REACT_APP_DATESTRING_FORMAT) /* timezone_string = "Australia/Sydney" */
}

export async function getAllUsers(token: string) {
    let data = await getSecretRequest(token, '/api/user/users')
    for (let i =0; i<data.length; i++)
    {
        console.log(data[i])
    }
    return await changeDateToUserTimezone(data)
}