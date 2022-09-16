const express = require('express');
const app = express()
const Contenedora = require('./index.js')
const productos = new Contenedora("./articulos.json")
const PORT = process.env.PORT
const server = app.listen(PORT,()=>{
    console.log("Listen service ..."+server.address().port)
})

app.get('/productos',(req,res)=>{
    res.json(productos.getAll())
})
app.get('/productoRandom',(req,res)=>{
    res.send(productos.getByIdRandom())
})
server.on("Error",()=>{
    console.log('Error')
})