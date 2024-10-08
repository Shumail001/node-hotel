const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    rice:{
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        enum: ['sweet','spice','normal'],
        default: "normal",
        required: true,
    },
    is_drink:{
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales:{
        type: Number,
        default: 0,
    }

},
    {timestamps: true},
)

const MenuItem = mongoose.model("MenuItem",menuItemSchema)

module.exports = MenuItem