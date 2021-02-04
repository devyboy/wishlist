import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'

const PORT = process.env.PORT || 8081

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Default endpoint gives empty page
app.get('/', (_req, res) => {
  res.send('🎉 Hello Wishlist! 🎉');
});

app.get('/resolver/:txt(.?*)',  (req, _res) => {
  fetch(req.params.txt).then((res) =>
    res
    .text()
    .then((html) => _res.send(html))
    .catch((err) => console.log(err))
  )
})

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
)