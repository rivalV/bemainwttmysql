const express = require('express');
const { Sequelize, DataTypes, Transaction } = require('sequelize');
const getModel = require('../models/user');
const authorization = require('../middleware/authorization');
require('dotenv').config();

const router = new express.Router();
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const User = getModel(sequelize, DataTypes);

router.get('/', authorization, async (req, res) => {
  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        const user = await User.findByPk(req.user, { transaction: t });
        return user;
      },
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
