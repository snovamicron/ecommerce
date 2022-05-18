const express = require('express')
const cors = require('cors')
require('dotenv').config({ path:'./.env'})
const connectToDatabase = require('./database/connectToDatabase')
const productRoutes = require('./routes/productRoutes')
const PORT = process.env.PORT || 4000
const app = express()
connectToDatabase()
app.use(cors())
app.use(express.json())
app.use('/api/v1', productRoutes)
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})