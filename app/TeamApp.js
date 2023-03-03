const uuid = require('uuid');
const Team = require('../db/models/Team');
const userRules = require('../utils/rules/userInTeam');

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
            return team;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

}