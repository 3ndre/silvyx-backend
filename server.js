const express = require('express');
const bodyParser = require('body-parser');

const cors = require("cors");


const app = express();



const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}



// Init Middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req,res) => {

  let info = {
    title: "Silvyx",
  };

  res.send(info)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
