const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const bcrypt = require("bcryptjs");

const saltRounds = 10;

exports.generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign({
            payload,
        },
        secretSignature,
        {
            algorithm: 'HS256',
            expiresIn: tokenLife
        },);
    } catch (err) {
        console.log('holy fuck');
        return null;
    }
}

exports.verifyToken = async (token, secretSignature) => {
    try {
        return await verify(token, secretSignature);
    } catch (err) {
        console.log('verify failed');
        return null;
    }
}

exports.hashPassword = async (plainPassword) => {
    return await bcrypt.hashSync(plainPassword, saltRounds);
};

exports.checkPassword = async (plainPassword, hash) => {
    return await bcrypt.compareSync(plainPassword, hash);
} ;