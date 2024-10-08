const express = require("express")

const app = express();

const passport = require("./auth")
const {jwtAuthMiddleware,generateToken} = require("./jwt")

const db = require("./db")
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const router = require("./routes/personRoutes")
const menuRouter = require("./routes/menuItemsRoutes")



app.use(express.json())


app.use(passport.initialize());


const localAuthMiddleware = passport.authenticate("local", {session: false})

// app.use(localAuthMiddleware)

app.get("/",jwtAuthMiddleware,  (req,res) => {
    return res.send("This is Home Page");
})



app.use("/person",router)
app.use("/menu",menuRouter)




app.listen(PORT, () => console.log(`Server is Listening on port ${PORT}`))