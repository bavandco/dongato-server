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
            // check for user exists
            let user = await User.findOne({
                email: userEmail
            });
            if (!user) {
                return new BaseAppResult(false, BaseAppStatusCode.NotFounded);
            }


            // get team for user not added before.
            let team = await Team.findOne({
                teamID: TeamID
            });

            if (!team) {
                new BaseAppResult(false, BaseAppStatusCode)
            }

            let flag = false;

            team.members.forEach(val => {
                if (val.user === user._id) {
                    flag = true;
                }
            });

            if (flag)
                return new BaseAppResult(false, BaseAppStatusCode.Duplicate);

            // update members.
            let result = await Team.updateOne({
                teamID: TeamID
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

    async getTeamByID(teamID) {
        try {
            let team = await Team.findOne({
                teamID: teamID
            });
            if (!team) {
                return new BaseAppResult(false, BaseAppStatusCode.NotFounded);
            }
            return new BaseAppResult(true, BaseAppStatusCode.Success, team.toObject());
        } catch (e) {
            console.log(e)
            return new BaseAppResult(false, BaseAppStatusCode.Unknown);
        }
    }

    async getUserTeamsWithoutPopulate(userID) {
        try {
            const teams = await Team.find({
                "members.user": userID
            });

            for (let i = 0; i < teams.length; i++) {
                teams[i] = teams[i].toObject();
            }

            return new BaseAppResult(
                true,
                BaseAppStatusCode.Success,
                teams
            );
        } catch (e) {
            console.log(e)
            return new BaseAppResult(false, BaseAppStatusCode.Unknown);
        }
    }

}