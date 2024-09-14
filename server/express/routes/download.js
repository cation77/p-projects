const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const fsPath = path.join(__dirname, '../public/nature.jpg')

router.get('/length', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end('' + fs.statSync(fsPath).size)
})

router.options('/range', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Range')
  res.end('')
})

router.get('/range', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.download(fsPath, 'nature.jpg', {
    acceptRanges: true
  })
})

module.exports = router
