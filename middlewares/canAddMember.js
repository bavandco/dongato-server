const {baseResponse} = require('../utils/functions');
const {resultCode} = require('../utils/works');
const userRules = require('../utils/rules/userInTeam');


const {teamApp} = require('../instances/app');

module.exports = async function (req, res, next) {
    try {
        let id = req.params.tid;
        let team = await teamApp.getTeamByID(id);
        if (!team.status) {
            return baseResponse(res, false, 'team not founded.', resultCode.NotFounded, 404);
        }
        let check = false;
        team.data.members.forEach((val) => {
            if (val.user === req.body.token.id)
                if (val.rule === userRules.Admin || val.rule === userRules.Owner) {
                    check = true;
                }
        });

        return check ? next() : baseResponse(res, false, 'Permission Denied', resultCode.NotAuthorized, 403);

    } catch (e) {
        next(e);
    }
}