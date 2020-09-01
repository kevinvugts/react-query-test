const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000
const compression = require('compression')

app.use(
  compression({
    threshold: 0,
    filter: shouldCompress,
  })
)

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.static(publicPath))

// if what the user requested is not available in the public folder, we'll send back the index.html
app.get('*', (req, res, next) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
