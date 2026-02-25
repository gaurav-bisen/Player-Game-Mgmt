import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import GoogleAuthService from '../../services/googleAuth/google.service.js'

export const initGooglePassport = () => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const service = GoogleAuthService.execute({
                    data: profile
                  });
              
                  const player = await service.run();

                  return done(null, player)
            } catch (error) {
                return done(error, null)
            }
        }
        )
    )
}