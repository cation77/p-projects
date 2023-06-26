const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
// const { Buffer } = require('buffer')

const router = express.Router()
const staticPath = path.join(process.cwd(), '/public/flies')
const staticTemporary = path.join(process.cwd(), '/public/temporary')

/* GET users listing. */
router.get('/:id', function (req, res) {
  console.log(req.params.id)
  res.send(`${req.params.id} respond with a resource`)
})

router.post('/', function (req, res) {
  const form = new multiparty.Form()
  form.encoding = 'utf-8'
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err)
      res.send({
        code: 500,
        message: `${err} 切片上传失败`
      })
      return
    }
    console.log(fields, files)
    // const fileName = fields.fileName[0]
    // const hash = fields.hash
    // const chunk = fields.chunk
    // const dir = `${staticTemporary}/${fileName}`
    // try {
    //   if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    // } catch (error) {
    //   res.status(500).send(`${fileName} 切片上传失败`)
    // }
  })
})
module.exports = router
