import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import jsdom from 'jsdom'
import validURL from 'valid-url'

const { JSDOM } = jsdom

const PORT = process.env.PORT || 8081

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Default endpoint gives empty page
app.get('/', (_req, res) => {
  res.send('🎉 Hello Wishlist! 🎉')
})

app.get('/resolver/:txt(.?*)', (req, _res) => {
  if (validURL.isUri(req.params.txt)) {
    fetch(req.params.txt).then((res) =>
      res.text().then((html) => {
        const dom = new JSDOM(html)
        const doc = dom.window.document

        const title =
          doc.querySelector('title') &&
          doc.querySelector('title').textContent
        const meta_title =
          doc.querySelector(`meta[name="title"]`) &&
          doc.querySelector(`meta[name="title"]`).content
        const meta_description =
          doc.querySelector(`meta[name="description"]`) &&
          doc.querySelector(`meta[name="description"]`).content
        const meta_keywords =
          doc.querySelector(`meta[name="keywords"]`) &&
          doc.querySelector(`meta[name="keywords"]`).content
        const h1 =
          doc.querySelector(`h1`) && doc.querySelector(`h1`).textContent
        const h2 =
          doc.querySelector(`h2`) && doc.querySelector(`h2`).textContent
        const h3 =
          doc.querySelector(`h3`) && doc.querySelector(`h3`).textContent
        const h4 =
          doc.querySelector(`h4`) && doc.querySelector(`h4`).textContent
        const h5 =
          doc.querySelector(`h5`) && doc.querySelector(`h5`).textContent
        const h6 =
          doc.querySelector(`h6`) && doc.querySelector(`h6`).textContent
        const img = [...doc.querySelectorAll(`img`)]
        const images = []
        img.forEach((val) => {
          images.push(val.src)
        })

        const price = doc.body.innerHTML.match(
          '(\\d+\\.\\d{1,2})')[0]

        _res.send({
          'title': title,
          'meta': {
            'title': meta_title,
            'description': meta_description,
            'keywords': meta_keywords,
          },
          'headers': {
            'h1': h1,
            'h2': h2,
            'h3': h3,
            'h4': h4,
            'h5': h5,
            'h6': h6,
          },
          'price': price,
          'images': images,
        })
      }).catch((err) => console.error(err)),
    ).catch((err) => console.error(err))
  } else {
    _res.status(400)
    _res.send('InvalidURL')
  }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
