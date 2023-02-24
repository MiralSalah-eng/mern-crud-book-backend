const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    email : {
        type :String,
        required: [true, 'Please Enter Your Email'],
        unique: true

    },
    password : {
        type :String,
        required: [true, 'Please Enter Password']
    },
},)

userSchema.statics.signup = async function (email,password) {
    if (!email || !password) {
        throw Error ('All Fields Must Be Filled')
    }

    if (!validator.isEmail(email)) {
        throw Error ('Invalid Email Format')
    }

    if(!validator.isStrongPassword(password)){
        throw Error ('Password Must Be Strong')
    }

    const exist = await this.findOne({email})
    if (exist) {
        throw Error ('Email Is Already Used')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash})

    return user

}

userSchema.statics.login = async function (email,password) {
    if (!email || !password) {
        throw Error ('All Fields Must Be Filled')
    }

    const user = await this.findOne({email})
    if (!user) {
        throw Error ('Incorrect Email')
    }

    const match = await bcrypt.compare(password,user.password)
    if (!match) {
        throw Error ('Incorrect Password')
    }

    return user
    
}

module.exports = mongoose.model('user',userSchema)
