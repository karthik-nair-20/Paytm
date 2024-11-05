const { Router } = require('express')
const router = Router();
const jwt = require('jsonwebtoken')
const { JWT_Secret } = require('../config')
const zod = require('zod');
const userMiddleware = require('../middleware/user');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');



// router.get('/balance', userMiddleware, async(req,res) => {
//   try {
//     console.log(req.userId)
//     const response = await Account.findOne({ userId: req.userId })
//     console.log(response)
//     if(response)
//     {
//       res.status(200).json({
//         msg: "balance fetch success",
//         response: response.balance
//       })
//     }
//     else{
//       res.sendStatus(404)
//     }
//   }
//   catch(e) {
//     res.sendStatus(404)
//   }
// })
router.get("/balance", userMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  });

  res.json({
    balance: account.balance
  })
});

router.post("/transfer", userMiddleware, async (req, res) => {
  // do a good transtion when sending and receving money.
  const ourSession = await mongoose.startSession();
  ourSession.startTransaction();

  // money , toAccountID
  const { amount, to } = req.body;
  // find from account
  const account = await Account.findOne({
    userId: req.userId
  }).session(ourSession)

  if (!account || account.balance < amount) {
    await ourSession.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance"
    })
  }

  const toAccount = await Account.findOne({
    userId: to
  }).session(ourSession);

  if (!toAccount) {
    await ourSession.abortTransaction();
    return res.status(400).json({
      message: "Invalid account"
    })
  }
  await Account.updateOne({
    userId: req.userId
  },
    {
      "$inc": {
        balance: -amount
      }
    }).session(ourSession)

  await Account.updateOne({
    userId: to,
  },
    {
      "$inc": {
        balance: amount
      }
    }
  ).session(ourSession)

  // commit the transaction
  await ourSession.commitTransaction();
  res.json({
    message: "Transfer successful"
  })


})

module.exports = router;