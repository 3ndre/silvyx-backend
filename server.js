const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const cors = require("cors");


const app = express();


// Connect Database
connectDB();


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


const authenticateToken = require('./middleware/authenticateToken');


// Init Middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))


//authenticted route
app.get('/secret', authenticateToken, async(req,res) => {
  res.send(`Welcome address ${req.authData.verifiedAddress}`)
})    


//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
