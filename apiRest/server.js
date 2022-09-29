/* ======================== MODULOS ======================== */
const express = require('express');
const bodyParser = require('body-parser');

/* ======================== INSTANCIA EXPRESS ======================== */
const app = express();

/* ======================== ROUTERS ======================== */
const routerProductos = require('./src/routes/productos.routes')

/*=========================== MIDDLEWARES  */
app.use('/', express.static(__dirname + '/public'));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, resn, next) => {
    console.log(`Se ejecuta el Midd de app, Time: ${Date.now()}`)
    next()
})
app.use('/api/productos', routerProductos); 

app.use(function (err, req, res, next) {
    console.error( err)
    res.status(500).send('Something broke!')
})

/* ======================== SERVER ======================== */
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.error(`Error en servidor ${error}`))