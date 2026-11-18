const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const Product = require('./models/Product') 

const app = express()
const port = process.env.PORT || 5000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/E-Commerce'
)
.then(() => console.log("DB Connected successfully..."))
.catch((err) => console.log("DB connection error: " + err))


let myCart = [] 

app.get('/', async (req, res) => {
    try {
        let cat = req.query.category
        let products

        if (cat && cat !== 'All') {
            products = await Product.find({ category: cat })
        } else {
            products = await Product.find()
        }

        
        let count = 0
        for(let i=0; i<myCart.length; i++) {
            count = count + myCart[i].quantity
        }

        res.render('index', {
            products: products,
            selectedCategory: cat || 'All',
            cartCount: count
        })
    } catch (err) {
        console.log(err)
        res.send("error loading page")
    }
})


app.post('/add-to-cart', async (req, res) => {
    let pId = req.body.productId
    let product = await Product.findById(pId)

    if (product) {
        let checkItem = myCart.find(item => item.product._id.toString() == pId)

        if (checkItem) {
            checkItem.quantity += 1
        } else {
            myCart.push({
                product: product,
                quantity: 1
            })
        }
    }
    res.redirect('/') 
})

app.get('/cart', (req, res) => {
    let totalAmt = 0;
    let count = 0

    for(let i=0; i<myCart.length; i++) {
        totalAmt += myCart[i].product.price * myCart[i].quantity
        count += myCart[i].quantity
    }

    res.render('cart', {
        cart: myCart,
        grandTotal: totalAmt,
        cartCount: count
    })
})

app.post('/remove-from-cart', (req, res) => {
    let id = req.body.productId
    myCart = myCart.filter(item => item.product._id.toString() !== id)
    res.redirect('/cart')
})

app.post('/checkout', (req, res) => {
    let name = req.body.customerName
    let phone = req.body.mobile
    let add = req.body.address

    
    if(myCart.length == 0) {
        return res.redirect('/cart')
    }

    let finalAmount = 0
    for(let i=0; i<myCart.length; i++) {
        finalAmount += myCart[i].product.price * myCart[i].quantity
    }

    myCart = []

    res.render('success', {
        customerName: name,
        totalAmount: finalAmount
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})