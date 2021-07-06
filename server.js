const express = require('express')
const cors = require('cors')
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
})


/**
 * POST /api/fileanalyse
 * {"name":"style.css","type":"text/css","size":522}
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file)
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
