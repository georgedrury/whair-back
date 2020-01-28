const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const crypto = require('crypto')

// const prevSalonSchema = new mongoose.Schema({
//     prevSalonName: {
//         type: String,
//         trim: true
//      },
//     prevSalonStartDate: Date,
//     prevSalonEndDate: Date,
// })
    
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created:{
        type: Date,
        default: Date.now
    },
    updated: Date, 
    message: {
        type: String,
        trim: true
    },
    contactPhone: {
        type: String,
        trim: true
    },
    contactInsta: {
        type: String,
        trim: true
    },
    currentSalonName: {
        type: String,
        trim: true
    },
    currentSalonDateStart: {
        type: Date
    },
    prevSalon:[{
        prevSalonName: String,
        prevSalonDateStart: Date,
        prevSalonDateEnd: Date
    }],
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: 'subscriber'
    }
})



// Virtual field

userSchema.virtual('password')
.set(function (password){
    // Create temporary variable called _password
    this._password = password
    // Generate a timestamp
    this.salt = uuidv1()
    // encryptPassword() Encrypt the password
    this.hashed_password = this.encryptPassword(password)
})
.get(function (){
    return this._password
})

// methods
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) == this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ""
        try{
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch(err){
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema)