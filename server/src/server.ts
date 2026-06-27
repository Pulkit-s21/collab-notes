import express from "express"
import documentRoutes from "./routes/document.routes"

const app = express()

const PORT = 3000

app.use(express.json())

app.use("/documents", documentRoutes)

app.listen(PORT, () => {
  console.log(`Collab Notes Server running on port ${PORT}`)
})
