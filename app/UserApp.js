const userModel = require('../db/models/User');
const utilsFunctions = require('../utils/functions');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

module.exports = class {
    async createUser(email, password, name) {
        password = await utilsFunctions.cryptPassword(password);
        const id = uuid.v4();
        let result = new userModel({
            _id: id,
            email,
            password,
            createdAt: new Date(),
            name
        });
        await result.save();
        result = result.toObject();
        let tokenPayLoad = utilsFunctions.createUserTokenPayLoad(id, Date.now() + (+process.env.TOKEN_LIFE || 3600000));
        const token = jwt.sign(tokenPayLoad, process.env.SECRET);

        let refreshToken = uuid.v4();

        await userModel.updateOne({email}, {
            $push: {
                refreshTokens: {
                    token: refreshToken
                }
            }
        });
        result.refreshToken = refreshToken;
        result.token = token;
        return result;
    }

    async getTokenByUserEmailAndPassword(email, password) {
        const user = await userModel.findOne({
            email: email
        });

        if (!user) {
            return false;
        }

        if (!await utilsFunctions.comparePassword(password, user.password)) {
            return false;
        }

        let tokenPayLoad = utilsFunctions.createUserTokenPayLoad(user._id, parseInt((Date.now() / 1000)) + (+process.env.TOKEN_LIFE || 3600));

        const token = jwt.sign(tokenPayLoad, process.env.SECRET);

        let refreshToken = uuid.v4();

        await userModel.updateOne({email}, {
            $push: {
                refreshTokens: {
                    token: refreshToken
                }
            }
        });
        return {
            token,
            refreshToken
        }
    }

    async getTokenByRefreshToken(email, refreshToken) {
        let user = await userModel.findOne({
            email
        });

        if (!user) {
            return false;
        }

        let flag = false;
        user.refreshTokens.forEach((val) => {
            if (val.token == refreshToken) {
                flag = true;
            }
        });

        if (!flag) {
            return false;
        }
        let tokenPayLoad = utilsFunctions.createUserTokenPayLoad(user._id, Date.now() + (+process.env.TOKEN_LIFE || 3600000));
        return jwt.sign(tokenPayLoad, process.env.SECRET);
    }

    async verifyToken(token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            return false;
        }
    }

    async getMe(userID) {
        try {
            let user = await userModel.findById(userID);

            if (!user) {
                return false;
            }

            return user.toObject();
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}