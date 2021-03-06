const express = require('express')
const router = express.Router()
const Dish = require('../models/dish')
const Category = require('../models/category')
const Order = require('../models/order')


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//get all
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find()
        const categories = await Category.find()
        res.json({categories: categories, dishes: dishes})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//get all dishes
router.get('/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find()
        res.json({dishes: dishes})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})


//get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json({categories: categories})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//get one dish
router.get('/dishes/:id', getDish, (req, res) => {
    res.json(res.dish)
})

//get one category
router.get('/categories/:id', getCategory, (req, res) => {
    res.json(res.category)
})

//create dish
router.post('/', async (req, res) => {
    const dish = new Dish({
        name: req.body.name,
        picture: req.body.picture,
        category: req.body.category,
        price: req.body.price
    })

    try {
        const newDish = await dish.save()
        res.status(201).json(newDish)
    } catch(err) { 
        res.status(400).json({message: err.message})
    }
})

//create category
router.post('/category', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        picture: req.body.picture
    })

    try {
        const newCategory = await category.save()
        res.status(201).json(newCategory)
    } catch(err) { 
        res.status(400).json({message: err.message})
    }
})

//update one dish 
router.patch('/dishes/:id', getDish, async (req, res) => {
    if (req.body.name != null) {
        res.dish.name = req.body.name
    }
    if (req.body.picture != null) {
        res.dish.picture = req.body.picture
    }
    try {
        const updatedDish = await res.dish.save()
        res.json(updatedDish)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//TODO update one category
router.patch('/categories/:id', getCategory, async (req, res) => {
    if (req.body.name != null) {
        res.category.name = req.body.name
    }
    if (req.body.picture != null) {
        res.category.picture = req.body.picture
    }
    try {
        const updatedCategory = await res.category.save()
        res.json(updatedCategory)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//delete one dish
router.delete('/dishes/:id', getDish, async (req, res) => {
    try {
        await res.dish.remove()
        res.json({message: 'item deleted'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//delete one category
router.delete('/categories/:id', getCategory, async (req, res) => {
    try {
        await res.category.remove()
        res.json({message: 'item deleted'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getDish(req, res, next) {
    let dish
    try {
        dish = await Dish.findById(req.params.id)
        if (dish == null) 
            return res.status(404).json({message: 'this dish not find'})
        
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.dish = dish
    next()
}

async function getCategory(req, res, next) {
    let category
    try {
        category = await Category.findById(req.params.id)
        if (category == null) 
            return res.status(404).json({message: 'category not find'})
        
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.category = category
    next()
}

/* Orders */

router.post('/orders', async (req, res) => {

    const order = new Order({
        customer: req.body.customer,
        items: req.body.items
    })

    console.log(order)

    try {
        await order.save()
        res.status(201)
    } catch(err) { 
        console.log('not ok', err.message)
        res.status(400).json({message: err.message})
    }
})

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
        res.json({orders: orders})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/orders/:id', getOrder, async(req, res)=>{
    try {
        await res.order.remove()
        res.json({message: 'order deleted'})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

async function getOrder(req, res, next) {
    let order
    try {
        order = await Order.findById(req.params.id)
        if (order == null) 
            return res.status(404).json({message: 'order not found'})
        
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.order = order
    next()
}

module.exports = router