const passport = require("passport");
const Person = require("./models/person");

const LocalSrategy = require("passport-local").Strategy

passport.use(new LocalSrategy( async (username, password, done) => {
    try{
        const user = await Person.findOne({username: username})
        if(!user){
            return done(null, false, {message: "Incorrect username"})
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(isPasswordMatched){
            return done(null,user)
        }else{
            return done(null, false, {message: "Incorrect password"});
        }

    }catch(err){
        return done("Bad Request");
    }
}))


module.exports = passport;