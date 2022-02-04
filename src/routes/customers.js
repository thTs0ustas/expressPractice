const express = require('express')
const mysql = require('mysql2')

const { getCustomers, saveCustomers } = require('../models/customers.model')
const poolConfigDetails = require('../config')

const router = express.Router()

router.get('/', (req, res) => {
  httpGetCustomers()
    .then(() => {
      res.render('customers/list', {
        title: 'Express 002 - Customers page',
        // list: getCustomers()
        list: getCustomers(),
      })
    })
    .catch(console.log)
})

async function httpGetCustomers() {
  await dbLogin()
    .then((data) => saveCustomers(data))
    .catch(console.log)
}

async function dbLogin() {
  const pool = mysql.createPool(poolConfigDetails)
  const sql = 'SELECT * FROM customer'

  return new Promise((resolve, reject) => {
    pool.execute(sql, (error, rows) => {
      if (error) {
        pool.end()
        return reject(error)
      } else {
        pool.end()
        return resolve(rows)
      }
    })
  })
}

module.exports = router
