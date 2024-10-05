const express = require("express")

const app = express();


const db = require("./db")
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const router = require("./routes/personRoutes")
const menuRouter = require("./routes/menuItemsRoutes")



app.use(express.json())

app.get("/", (req,res) => {
    return res.end("This is Home Page");
})


app.use("/person",router)
app.use("/menu",menuRouter)




app.listen(PORT, () => console.log(`Server is Listening on port ${PORT}`))