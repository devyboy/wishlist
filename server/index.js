import cors from 'cors'
import express from 'express'
import DomParser from 'dom-parser'
import fetch from 'node-fetch'
import jsdom from 'jsdom'
import validURL from 'valid-url'

const { JSDOM } = jsdom

const PORT = process.env.PORT || 8081

const app = express()

app.use(cors())

app.get('/', (_req, res) => {
  res.send('🎉 Hello Wishlist! 🎉')
})

app.get('/resolver/:txt(.?*)', (req, _res) => {
  if (validURL.isUri(req.params.txt)) {
    fetch(req.params.txt)
      .then((res) =>
        res
          .text()
          .then((html) => {
            var parser = new DomParser()
            var dom = parser.parseFromString(html)
            _res.send({ ...amazonParser(dom), url: req.params.txt })
          })
          .catch((err) => console.error(err))
      )
      .catch((err) => console.error(err))
  } else {
    _res.status(400)
    _res.send('InvalidURL')
  }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

const grabAndMapByTag = (dom, html) => (tag) =>
  dom.getElementsByTagName(tag).map((m) => m[html])

const grabByID = (dom) => (id) => dom.getElementById(id)

const amazonParser = (dom) => {
  var [domOuter, domInner] = [
    grabAndMapByTag(dom, 'outerHTML'),
    grabAndMapByTag(dom, 'innerHTML')
  ]
  var domByID = grabByID(dom)

  var price = domByID('priceblock_ourprice')
    ? domByID('priceblock_ourprice').innerHTML
    : domByID('priceblock_dealprice')
    ? domByID('priceblock_dealprice').innerHTML
    : dom.getElementsByClassName('a-color-price') // for books, could replace with ""
    ? dom.getElementsByClassName('a-color-price')[0].innerHTML
    : ''

  const category = domByID('wayfinding-breadcrumbs_feature_div')
    .getElementsByClassName('a-color-tertiary')[0]
    .innerHTML.trim()

  var title = dom.getElementById('productTitle').innerHTML.trim()

  const description = domByID('feature-bullets')
    ? domByID('feature-bullets')
        .getElementsByClassName('a-list-item')[1]
        ?.innerHTML.concat(
          ` ${
            domByID('feature-bullets').getElementsByClassName('a-list-item')[2]
              .innerHTML
          }`
        )
        .replace(/(\r\n|\n|\r)/gm, '')
    : ''
  const image = domByID('landingImage')
    ? domByID('landingImage').getAttribute('data-old-hires')
    : 'https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png'

  return { title, category, price, image, description }
}
