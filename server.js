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



//authenticted route
app.get('/secret', authenticateToken, async(req,res) => {
  res.json({data: `Welcome address ${req.authData.verifiedAddress}`})
})    


app.get('/', (req,res) => {
  res.json({data: "Silvyx Backend | P2P withdrawal network"})
})

//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/conversations', require('./routes/api/conversations'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/auth', require('./routes/api/auth'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
