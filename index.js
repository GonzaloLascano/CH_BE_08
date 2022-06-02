const express = require('express') //se llama al modulo de express

// Se crea el servidor, se elige el numero de puerto.
const app = express()
const PORT = 8080
//Se crea instancia de Router, se lo configura para preinterpretar JSON, se levanta el servidor en el puerto asignado con notificacion en caso de errores
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
const server = app.listen(PORT, () =>{
    console.log('servidor levantado en el puerto ' + server.address().port)
})
server.on('error', (error) => console.log({mensaje: `hubo un error :( ${error}`}))

//variable para que los productos almacenados permanezcan en memoria.
let products = []

//se definen los pedidos y endpoints de la ruta creada
function middleIdentifier (req, res, next){
    let error = {mensaje: 'Producto no encontrado'}
    req.idProduct = products.find(product => product.id == req.params.id)
    if(req.idProduct){
        next()
    }
    else {res.json(error)}
}

router.get('/', (req, res) => {
    res.json(products)
})

router.get('/:id', middleIdentifier, (req, res) => {
    let idProduct = req.idProduct
    //console.log(idProduct)
    res.json(idProduct)
    
})

router.post('/', (req, res) => {
    let newProduct = req.body
    newProduct = {...newProduct, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    console.log(newProduct)
    products.push(newProduct)
    res.json(newProduct)
})

router.delete('/:id', middleIdentifier, (req, res) => {
    //console.log('eliminando producto. . .')
    products = products.filter(product => product !== req.idProduct)
    //console.log(products)
    res.json({mensaje: 'se eliminó correctamente el producto'})
})

router.put('/:id', middleIdentifier, (req, res)=>{
    //console.log('modificando objeto. . .')
    products = products.map(product => {
        if (product === req.idProduct) {
            product = {...req.body, id: product.id}
            return product
        }
        else {
            return product
        }
    })
    //console.log(products)
    res.json({mensaje: 'Objeto modificado con exito!'})
})

// Se le define una ruta de dominio publico para ingresar al formulario
app.use('/formulario', express.static('public'))
//se define la ruta principal de la cual derivaran todas las peticiones del router
app.use('/api/productos', router)