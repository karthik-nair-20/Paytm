const { Router } = require('express')
const router = Router();
const jwt = require('jsonwebtoken')
const { JWT_Secret } = require('../config')
const zod = require('zod')
const { User, Account } = require('../db/index');
const userMiddleware = require('../middleware/user');


const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})

router.post('/signup', async (req, res) => {
  const body = req.body;
  const { success } = signupBody.safeParse(req.body)
  if (!success) {
    res.status(400).json({
      msg: "Email already taken or Incoorect Inputs"
    })
  }
  const userExist = await User.findOne({ username: body.username })
  if (userExist) {
    res.json({
      msg: "User with this username already exist"
    })
    return;
  }
  const user = await User.create(body)
  // giving a random balance to each user
 const account = await Account.create({
    userId: user._id,
    balance: 1+ Math.random() * 10000
  })
  const token = jwt.sign({ userId: user._id }, JWT_Secret)
  res.status(200).json({
    msg: "User created successfully",
    token: token,
    account: account.balance
  })
  return;
})

// need to use middlware?
router.post('/signin', async (req, res) => {
  try {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs"
      })
    }
    const user = await User.findOne({ username: req.body.username, password: req.body.password })
    if (user) {
      const token = jwt.sign({ userId: user._id }, JWT_Secret)
      res.status(200).json({
        msg: "User signedin successfully",
        token
      })
      return;
    }
    else {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }
  } catch (e) {
    return res.sendStatus(404)
  }
})

router.put('/', userMiddleware, async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
      res.status(411).json({
        msg: "Error while updating information"
      })
    }
    const response = await User.updateOne({ userId: req.userId }, req.body);
    if (response) {
      res.status(200).json({
        msg: "Updated successfully",
        response: response.acknowledged
      })
    }
  } catch (e) {
    res.sendStatus(404);
  }
})

// this one was Good
router.get('/bulk', async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        {
          firstName: {
            '$regex': filter,
            '$options': 'i'
          },
        },
        {
          lastName: {
            '$regex': filter,
            '$options': 'i'
          }
        }
      ]
    })
    res.status(200).json({
      msg: "Users",
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      }))
    })
  } catch(e) {
    res.sendStatus(404)
  }

})

module.exports = router;