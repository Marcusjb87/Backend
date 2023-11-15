import express, { json } from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { webRouter } from './routers/webRouter.js'
import { viewsRouter } from './routers/viewsRouter.js'
import { engine } from 'express-handlebars'
import { Server as IOServer } from 'socket.io'
import { productManager } from './routers/productRouter.js'

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

const server = app.listen(8080, () => {
  console.log('Conectado al puerto 8080')
})

const ioServer = new IOServer(server)

ioServer.on('connection', async socket => {
  console.log('nueva conexion: ', socket.id)
  socket.emit('products',
    await productManager.getProducts())

  socket.on('nuevoProduct', async product => {
    await productManager.addProduct(product)
    ioServer.sockets.emit('products',
      await productManager.getProducts())
  })
})

app.use((req, res, next) => {
    req['io'] = ioServer
    next()
})

app.use(express(json))
app.use('api', apiRouter)
app.use('/', webRouter)
app.use('/realtimeproducts', viewsRouter)
app.use('/static', express.static('./static'))

app.use((err, req, res, next) => {
  res.json({
    status: 'error',
    descr: err.message
  })
})