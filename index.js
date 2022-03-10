const express = require('express')
const app = express()
const PORT = 8080

const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
const server = app.listen(PORT, () =>{
    console.log('servidor levantado en el puerto ' + server.address().port)
})

server.on('error', (error) => console.log(`hubo un error: ${error}`))

let products = []

router.get('/', (req, res) => {
    res.json(products)
})

router.get('/:id', (req, res) => {
    res.json(products[req.params.id - 1])
})

router.post('/', (req, res) => {
    let newProduct = req.body
    newProduct = {...newProduct, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    console.log(newProduct)
    products.push(newProduct)
    res.json({ mensaje:'se agrego correctamente' })
})

router.delete('/:id', (req, res) => {
    console.log('eliminando producto. . .')
    products = products.filter((product) => {
        if (product.id != req.params.id) {
            return product
        }    
    })
    console.log(products)
    res.json({mensaje: 'se edito correctamente el producto'})
})

router.put('/:id', (req, res)=>{
    console.log('modificando objeto. . .')
    products = products.map(product => {
        if (product.id == req.params.id) {
            product = {...req.body, id: product.id}
            return product
        }
        else {
            return product
        }
    })
    console.log(products)
    res.json('Objeto modificado con exito!')
})

app.use('/formulario', express.static('public'))
app.use('/api/productos', router)