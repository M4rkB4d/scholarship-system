const app = require('./app')
const connectioDatabase = require('./config/database')

const dotenv = require('dotenv');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' })

// Connecting to database
connectioDatabase() 

app.listen(process.env.PORT, () => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})