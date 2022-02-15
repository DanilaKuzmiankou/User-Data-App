const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE},
    status: {type: DataTypes.STRING, defaultValue: "NOT BANNED"}
})

module.exports = {User}

