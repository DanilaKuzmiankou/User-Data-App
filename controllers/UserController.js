const ApiError = require('../error/ApiError')
const User = require('../models/Models').User
const jwt = require('jsonwebtoken')
const request = require("request");


const getAllUsersFromAuth = (token) => {
    return new Promise(function (resolve, reject) {
            var options = {
                method: "GET",
                url: 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/users',
                params: {q: 'email:""', search_engine: 'v3'},
                headers: {"authorization": "Bearer " + token, 'content-type': 'application/json'},
            }
            request(options, function (error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    resolve(JSON.parse(body))
                }
            })
        }
    )
}

const deleteUserFromAuth = (token, userId) => {
    return new Promise(function (resolve, reject) {
            var options = {
                method: "DELETE",
                url: 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
                headers: {"authorization": "Bearer " + token, 'content-type': 'application/json'},

            }
            request(options, function (error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    resolve(response.statusCode)
                }
            })
        }
    )
}

const blockOrUnblockFromAuth = (token, userId, block) => {
    return new Promise(function (resolve, reject) {
            var options = {
                method: "PATCH",
                url: 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
                headers: {"authorization": "Bearer " + token, 'content-type': 'application/json'},
                body: {blocked: block},
                json: true,
            }
            request(options, function (error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    resolve(response.statusCode)
                }
            })
        }
    )
}

const getManagementApiJwt = () => {
    return new Promise(function (resolve, reject) {
            var options = {
                method: "POST",
                url: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    client_id: process.env.AUTH0_CLIENT_ID,
                    client_secret: process.env.AUTH0_CLIENT_SECRET,
                    audience: process.env.AUTH0_AUDIENCE,
                    grant_type: "client_credentials",
                }),
            }
            request(options, function (error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    resolve(JSON.parse(body))
                }
            })
        }
    )
}


class UserController {


    async register(req, res, next) {
        const {email, name} = req.body
        if (!email) {
            return next(ApiError.badRequest('Enter email'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            //updating user last activity date(field updatedAt)
            candidate.changed('updatedAt', true)
            candidate.changed('name', true)
            await candidate.save({silent: false})
            return res.status(500).json({message: 'user have been registered'})
        }
        const user = await User.create({email, name})
        return res.status(200).json({message: 'user have been registered'})
    }


    async getUsers(req, res) {
        let users;
        await User.sync()
        users = await User.findAll()
        return res.json(users)
    }


    async blockUser(req, res) {
        const mails = req.body
        const token = await getManagementApiJwt()
        const allUsers = await getAllUsersFromAuth(token.access_token)
        let usersToBlock = []
        for (let i = 0; i < allUsers.length; i++) {
            let result = allUsers.find(user => user.email === mails[i]);
            if (result) usersToBlock.push(result.user_id)
        }
        for (let i = 0; i < usersToBlock.length; i++) {
            await blockOrUnblockFromAuth(token.access_token, usersToBlock[i], true)
            let email = mails[i]
            const candidate = await User.findOne({where: {email}})
            candidate.status = "BANNED"
            await candidate.save()
        }
        let newUsers = await User.findAll()
        return res.json(newUsers)
    }

    async unBlockUser(req, res) {
        const mails = req.body
        const token = await getManagementApiJwt()
        const allUsers = await getAllUsersFromAuth(token.access_token)
        let usersToUnBlock = []
        for (let i = 0; i < allUsers.length; i++) {
            let result = allUsers.find(user => user.email === mails[i]);
            if (result) usersToUnBlock.push(result.user_id)
        }
        for (let i = 0; i < usersToUnBlock.length; i++) {
            await blockOrUnblockFromAuth(token.access_token, usersToUnBlock[i], false)
            let email = mails[i]
            const candidate = await User.findOne({where: {email}})
            candidate.status = "NOT BANNED"
            await candidate.save()
        }
        let newUsers = await User.findAll()
        return res.json(newUsers)
    }


    async deleteUser(req, res) {
        const mails = req.body
        const token = await getManagementApiJwt()
        const allUsers = await getAllUsersFromAuth(token.access_token)
        let usersToDelete = []
        for (let i = 0; i < allUsers.length; i++) {
            let result = allUsers.find(user => user.email === mails[i]);
            if (result) usersToDelete.push(result.user_id)
        }
        for (let i = 0; i < usersToDelete.length; i++) {
            await deleteUserFromAuth(token.access_token, usersToDelete[i])
            await User.destroy({
                where: {
                    email: mails[i]
                }
            });
        }
        let newUsers = await User.findAll()
        return res.json(newUsers)
    }


}

module.exports = new UserController()
