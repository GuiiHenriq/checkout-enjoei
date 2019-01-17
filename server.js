const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('static'))

app.get('/', function (req, res) {
  res.redirect('/produto/1321/checkout/6544')
})

app.get('/produto/:productId/checkout/:checkoutId', function (req, res) {
  res.sendFile('checkout.html', { root: __dirname })
})

const coupon = {
  id: 3,
  title: 'black friday',
  discount: 12.00
}

const product = {
  id: 1321,
  title: 'vestido floral',
  price: 100.00,
  image: 'http://localhost:3000/img/product.jpg'
}

const checkout = {
  id: 6544,
  productId: 1321,
  shippingPrice: 20,
  availableCoupons: [coupon]
}

app.get('/api/checkouts/:checkoutId', function (req, res) {
  checkout.totalPrice = product.price + checkout.shippingPrice

  if (parseInt(req.query.couponId, 10) === coupon.id) {
    checkout.totalPrice -= coupon.discount
  }

  res.json({ product: product, checkout: checkout })
})

app.post('/api/checkouts/:checkoutId', function (req, res) {
  res.json({ status: 'success' })
})

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`)
})
