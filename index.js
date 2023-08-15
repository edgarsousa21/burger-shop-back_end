/*
https://github.com/rodolfomori/desafio-node-1/blob/master/README.md?_gl=1*h5pf3k*_ga*MTEwNTU2ODAxLjE2ODk3NzA0Mzg.*_ga_37GXT4VGQK*MTY5MDA4MDA0Ny42LjEuMTY5MDA4MDUwMC4wLjAuMA..
*/

const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = 3001
const app = express()
app.use(express.json())
app.use(cors())


const allOrders = []

const checkOrdersId = (request, response, next) => {

    const { id } = request.params

    const index = allOrders.findIndex(client => client.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "Client Not Found" })
    }

    request.clientId = id

    request.clientIndex = index

    next()
}


const checkRequest = (request, response, next) => {
    const methods = request.method

    const url = request.url

    console.log(`${methods} - ${url}`)

    next()
}


app.get('/orders', checkRequest, (request, response) => {

    return response.json(allOrders)

})


app.post('/orders', checkRequest, (request, response) => {

    const { order, clientName, price } = request.body

    const status = "Em Preparação..."

    const client = { id: uuid.v4(), order, clientName, price, status }

    allOrders.push(client)

    return response.status(201).json(client)


})


app.get('/orders/:id', checkRequest, checkOrdersId, (request, response) => {

    const index = request.clientIndex

    const client = allOrders[index]

    return response.json(client)

})


app.put('/orders/:id', checkRequest, checkOrdersId, (request, response) => {

    const { order, clientName, price } = request.body

    const id = request.clientId

    const index = request.clientIndex

    const status = "Em Preparação..."

    const updatedOrder = { id, order, clientName, price, status }

    allOrders[index] = updatedOrder

    return response.json(updatedOrder)

})


app.patch('/orders/:id', checkRequest, checkOrdersId, (request, response) => {

    const { order, clientName, price } = request.body

    const id = request.clientId

    const index = request.clientIndex

    const status = "Pronto!!!"

    const updatedOrder = { id, order, clientName, price, status }

    allOrders[index] = updatedOrder

    return response.json(updatedOrder)

})


app.delete('/orders/:id', checkRequest, checkOrdersId, (request, response) => {

    const index = request.clientIndex

    allOrders.splice(index, 1)

    return response.status(204).json()

})


app.listen(port, () => {

    console.log(`🍔😎Server Started On Port ${port}😎🍔`)

}) // app.listen(port, () => {})


/*
http://localhost:3001/orders

  {    
    "order": "X- Salada, 2 batatas grandes, 1 coca-cola",
    "clientName": "José", 
    "price": 44.50    
  }

   {    
    "order": "Salcicha com Manjericão, 1 fanta-uva",
    "clientName": "Snoop dog", 
    "price": 666.66   
  }

   {    
    "order": "X-Bacon, 1 Guaraná-Mineiro",
    "clientName": "Sandra", 
    "price": 65.55  
  }
*/

