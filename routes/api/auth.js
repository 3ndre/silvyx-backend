const express = require('express');
const jwt = require('jsonwebtoken');
const Web3 = require('web3'); 
const router = express.Router();

const web3 = new Web3('https://cloudflare-eth.com/');
const jwtSecret = 'FvTrJ13XN69'



router.get('/nonce', (req,res) => {

    const nonce = new Date().getTime()
    const address = req.query.address //querying wallet address from header
   
    const tempToken = jwt.sign({nonce, address}, jwtSecret, { expiresIn: '60s'})
    const message = getSignMessage(address, nonce)
    
    res.json({tempToken, message})
   })
   


router.post('/verify', async (req,res) => {
    const authHeader = req.headers['authorization']
    const tempToken = authHeader && authHeader.split(" ")[1]
  
    if (tempToken === null) return res.sendStatus(403)
  
    const userData = await jwt.verify(tempToken, jwtSecret)
    const nonce = userData.nonce
    const address = userData.address
    const message = getSignMessage(address, nonce)
    const signature = req.query.signature
  
    const verifiedAddress = await web3.eth.accounts.recover(message, signature)
  
    if(verifiedAddress.toLowerCase() == address.toLowerCase()) {
      const token = jwt.sign({verifiedAddress}, jwtSecret, {expiresIn: '1d'})
      res.json({token})
    } else {
      res.sendStatus(403)
    }
  })
  
  
  const getSignMessage = (address, nonce) => {
    return `Please sign this message for address ${address}:\n\n${nonce}`
  }
  
  

module.exports = router;
