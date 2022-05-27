const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter product name']
    },
    description:{
        type:String,
        required:[true, 'Please enter product description']
    },
    price:{
        type:Number,
        required:[true, 'Please enter product price'],
        maxlength:[8, 'Price can not exceed 8 characters']
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, 'Please enter category']
    },
    stock:{
        type:Number,
        maxlength:[4, 'stock can not exceed 4 characters'],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                default:0
            },
            comment:{
                type:String,
                required:true
            },
            user:{
                type: mongoose.Schema.ObjectId,
                ref:"users",
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('products', productSchema)