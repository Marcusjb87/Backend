import express, { json } from 'express'
import { apiRouter } from './routers/apiRouter.js'

const app = express()

app.use(express(json))

app.use('api', apiRouter)

app.use((err, req, res, next) => {
    res.json({
      status: 'error',
      descr: err.message
    })
  })

app.listen(8080, () => {
    console.log('Conectado al puerto 8080')
})