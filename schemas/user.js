const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String} 
})

const User = model('User', UserSchema)
module.exports = User