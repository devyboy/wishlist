import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 8081

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Default endpoint gives empty page
app.get('/', (_req, res) => {
  res.send('🎉 Hello Wishlist! 🎉');
});



app.get('/resolver/:txt(.?*)',  (req, res) => {
  res.send("URL is " + req.params.txt)
})

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
)