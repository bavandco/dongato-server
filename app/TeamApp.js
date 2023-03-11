const uuid = require('uuid');
const Team = require('../db/models/Team');
const userRules = require('../utils/rules/userInTeam');
const User = require('../db/models/User');
const BaseAppResult = require('./Base/BaseAppResult');
const BaseAppStatusCode = require('./Base/BaseAppStatusCode');

module.exports = class {
    async createTeam(userID, name) {
        try {
            let id = uuid.v4();
            let team = new Team({
                _id: id,
                name,
                teamID: id,
                members: [
                    {
                        user: userID,
                        rule: userRules.Owner
                    }
                ],
                owner: userID
            });

            await team.save();
            return team.toObject();
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async addUserToTeam(userEmail, TeamID) {
        try {
            let user = await User.findById({
                email: userEmail
            });
            if (!user) {
                return new BaseAppResult(false, BaseAppStatusCode.NotFounded);
            }
            let result = await Team.updateOne({
                teamId: TeamID
            }, {
                $push: {
                    members: {
                        user: user._id,
                        rule: userRules.Member
                    }
                }
            });

            return result.matchedCount === 1 ?
                new BaseAppResult(true, BaseAppStatusCode.Success) :
                new BaseAppResult(false, BaseAppStatusCode)
        } catch (e) {
            console.log(e);
            return new BaseAppResult(false, BaseAppStatusCode.Unknown);
        }
    }

}