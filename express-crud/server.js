require('dotenv').config()
const express = require('express'),
      app     = express() ,
      mongoose = require('mongoose'),
      port    = process.env.PORT,
      PostRouter = require('./routes/postRouter')

// Database Connection
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
if(db) {console.log('Connection Success')}
// db.on('error' , (error) => {console.error(error.message)})
// db.once('open' , () => console.log('Connection Success'))

app.use(express.json())

app.use('/api/v1' , PostRouter);

app.listen(port , () => {
    console.log(`Server Running .... `)
});
