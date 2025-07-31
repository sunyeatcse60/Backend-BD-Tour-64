import  bcryptjs  from 'bcryptjs';
/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";






passport.use(
  new LocalStrategy({                           // local stratage for local login
    usernameField: "email",
    passwordField: "password"
  },
    async (email: string, password: string, done) => {

      try {

        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
          return done(null, false, { message: "User does not exit" })
        }


        const isGoogleAuthanticated = isUserExist.auths.some( providerObjects => providerObjects.provider == "google");

        if(isGoogleAuthanticated && !isUserExist.password){
          return done (null , false, { message : "You are login with google"})
        }



        const isPasswordMatched = await bcryptjs.compare(password, isUserExist.password as string);

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password does not match" })
        }


        return done(null,isUserExist)

      }
      catch (error) {
        console.log(error);
        done(error)
      }

    })
)









passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {

      try {

        const email = profile.emails?.[0].value;

        if (!email) {
          return done(null, false, { message: "No email found" });
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.User,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user);
      }

      catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error);
      }
    }
  )
);


// frontend localhost : 5173 -> localhost:5000/api/v1/auth/google  ->passport -> google oauth consent
//  -> gmail login -? successful ->callback url.... localhost:5000/api/v1/auth/google/callback -> DB store ->
// token

// bridge == custom -> email,password, role: user, name .... -> registration -> DB -> 1 user created
// Google -> req -> google -> successful : jwt token : role, email -> DB -> store




passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id)
})


passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    console.log(error);
    done(error)

  }
})