import express from 'express'
import logger from 'morgan'
import session from 'express-session'
import userRouter from './src/backEnd/routes/userRouter.mjs'
import { databaseController } from './src/backEnd/controller/dataBaseController.mjs'

console.log('Connecting to MongoDB...')
try {
  await databaseController.connectDatabase()
} catch (err) {
  console.log('Error connecting to MongoDB', err)
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  cookie: {
    maxAge: 1800000
  },
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat',
  rolling: true
}))

app.set('view engine', 'ejs')

app.use(logger('dev'))

app.set('views', 'src/frontEnd/views')
app.use('/css', express.static('src/frontEnd/css'))
app.use('/images', express.static('src/frontEnd/images'))
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use('/', userRouter)
const port = 3000

app.listen(port, () => {
  console.log(`Server started on port ${port}\nYou can run it by copy the following link => http://localhost:${port}`)
})
