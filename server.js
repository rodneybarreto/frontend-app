require('dotenv').config()

const axios = require('axios')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const PRODUCTS_HOST = process.env.PRODUCTS_HOST || '0.0.0.0'
const PRODUCTS_PORT = process.env.PRODUCTS_PORT || 8081
const SHIPPING_HOST = process.env.SHIPPING_HOST || '0.0.0.0'
const SHIPPING_PORT = process.env.SHIPPING_PORT || 8082
const COMMENTS_HOST = process.env.COMMENTS_HOST || 'localhost'
const COMMENTS_PORT = process.env.COMMENTS_PORT || 8083

app.get('/', async (req, res) => {
  try {
    const shipping = {
      host: SHIPPING_HOST,
      port: SHIPPING_PORT
    }
    const comments = {
      host: COMMENTS_HOST,
      port: COMMENTS_PORT
    }

    const result = await axios.get(`http://${PRODUCTS_HOST}:${PRODUCTS_PORT}/products`)
    res.render('pages/index', { products: result.data, shipping, comments })
  }
  catch(error) {
    console.log(error)
    res.status(404).send('Erro na tentativa de listar os produtos')
  }
})

const HOST = process.env.FRONTEND_HOST || '0.0.0.0'
const PORT = process.env.FRONTEND_PORT || 8080
app.listen(PORT, HOST, () => {
  console.log(`Frontend-APP site running on HOST: ${HOST} PORT: ${PORT}`)
})