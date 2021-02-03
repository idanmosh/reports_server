const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/outlook',
    passport.authenticate('msgraph', 
    { 
        scope: ['openid',
        'offline_access',
        'profile',
        'User.Read'
        ] 
    }
));

router.get('/outlook/callback', 
    passport.authenticate('msgraph', {
        successRedirect: 'auth/outlook/redirect',
        failureRedirect: 'auth/outlook'
    }),
    async (req, res) => {
        console.log(req.user.dataValues);
        res.send(req.user.dataValues);
    }
);

router.get('/outlook/redirect', 
    async (req, res) => {
        console.log(req.user.dataValues);
        res.redirect('reports');
    }
);

router.get('/outlook/logout', (req, res) => {
    req.logOut();
    req.destroy();
})

module.exports = router;