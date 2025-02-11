import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import morgan from 'morgan'
import { errorHandler, connectToDb } from './utils'
import routes from './routes'

const app = express()
app.use(morgan('dev'))
app.use(json())
app.use(cors())

app.use('/api', routes)
app.use(errorHandler)

app.use(express.urlencoded({extended:true}))
app.get('/',async(req,res,next)=>{
  console.log(req.headers['authorization'])
  res.send('Hey man !')}
)


export default async function run() {
  await connectToDb()
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
