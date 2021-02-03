const OutlookStrategy = require('passport-outlook').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
     new OutlookStrategy(
        {
        clientID: process.env.OUTLOOK_CLIENT_ID,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
        callbackURL: 'http://10.100.102.9:3000/auth/outlook/callback',
        name: 'msgraph'
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                outlookId: profile.id,
                givenName: profile.givenName,
                mail: profile.mail,
                surname: profile.surname,
            }

            try {
                let user = await User.find({ outlookId: profile.id });

                if(user)
                    done(null, user);
                else {
                    user = await User.create(newUser);
                    done(null, user);
                }
            } catch(e) {
                console.log(e);
            }
        }
     )
    );

    passport.serializeUser((user, done) => {
        console.log(`serializeUser: ${user}`);
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        console.log(`serializeUser: ${user}`);
        User.findById(id, (err, user) => done(err, user));
    });
}