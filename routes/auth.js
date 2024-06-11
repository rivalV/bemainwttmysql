/* eslint-disable quotes */
const {
  Sequelize,
  DataTypes,
  Op,
  ValidationError,
  Transaction,
} = require('sequelize');
const express = require('express');
const bcrypt = require('bcrypt');
const getModel = require('../models/user');
const jwtGenerator = require('../utils/jwtGenerator');
const authorization = require('../middleware/authorization');
require('dotenv').config();

const router = new express.Router();
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const User = getModel(sequelize, DataTypes);

// registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED },
      async (t) => {
        const newUser = await User.create(
          {
            userName: username,
            userEmail: email,
            userPassword: encryptedPassword,
          },
          { transaction: t },
        );
        return newUser;
      },
    );

    const token = jwtGenerator(result.userId);
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error.messsage);
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const { username = '', email = '', password = '' } = req.body;

    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED },
      async (t) => {
        const userFinded = await User.findOne({
          where: {
            [Op.or]: [{ userName: username }, { userEmail: email }],
          },
          transaction: t,
        });
        return userFinded;
      },
    );

    if (!result) {
      return res
        .status(401)
        .json({ message: "Username or email doesn't registered" });
    }

    const validPassword = await bcrypt.compare(password, result.userPassword);
    if (!validPassword) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    const token = jwtGenerator(result.userId);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// verify checker route
router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.status(200).json({
      isAuthorize: true,
      message: 'Authorization accepted',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
