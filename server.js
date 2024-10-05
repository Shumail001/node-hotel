const express = require("express")

const app = express();

const PORT = 4000;

const db = require("./db")

const router = require("./routes/personRoutes")
const menuRouter = require("./routes/menuItemsRoutes")



app.use(express.json())

app.get("/", (req,res) => {
    return res.end("This is Home Page");
})


app.use("/person",router)
app.use("/menu",menuRouter)





app.listen(PORT, () => console.log(`Server is Listening on port ${PORT}`))