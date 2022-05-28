import express, { Application, Request, Response } from 'express'
const PORT = process.env.PORT || 3000
const app: Application = express()

// add routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 👋 🌍',
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

export default app
