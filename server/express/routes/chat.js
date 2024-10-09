const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json())

const article = `时代有时代的大潮流、大节奏，我们也要有自己的小浪潮、小节奏，跟着时代奔跑，别掉了自有节拍。`

const randomArticle = [
  `时代有时代的大潮流、大节奏，我们也要有自己的小浪潮、小节奏，跟着时代奔跑，别掉了自有节拍。`,
  `我希望在繁华尽处，寻一抹静谧，泛舟湖上，三五好友，一壶老酒，家人作伴，唱歌会友。来吧，于绿野间、阳光下创造美好，治愈青春。`,
  `在为梦狂奔的路上，有风急雨骤，有孤夜寂寥。不要怕，回头看看，家人就在身后，打着那束温暖的光。`,
  `山有顶峰，湖有彼岸，在人生漫漫长途中，万物皆有回转，当我们觉得余味苦涩，请你相信，一切终有回甘。`,
  `流水爱高山，它滋养苍绿千千万万年，飞鸟爱天空，他不留痕迹，划过白昼与黑暗。而你，有没有如此热爱过，像此间人生不能重复般炽热地、绵长地、锱铢必较或不求回报地热爱。`
]

router.get('/typing', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  let index = 0
  let timerId = 0
  // 模拟每隔 0.1s 向前端推送一次
  timerId = setInterval(() => {
    // 获取文字
    const char = article[index]
    // 下标累加
    index++
    // 响应结果
    if (char) {
      const data = { char, timestamp: Date.now() }
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    } else {
      res.end()
      clearInterval(timerId)
    }
  }, 100)
})

router.post('/randomTyping', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  // res.setHeader('Connection', 'keep-alive');
  let index = 0
  let timerId = 0
  const randomIndex =
    req.body.index || Math.floor(Math.random() * randomArticle.length)
  console.log(req.body)
  // 模拟每隔 0.1s 向前端推送一次
  timerId = setInterval(() => {
    // 获取文字
    const char = randomArticle[randomIndex][index]
    // 下标累加
    index++
    // 响应结果
    if (char) {
      const data = { char, timestamp: Date.now() }
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    } else {
      res.end()
      clearInterval(timerId)
    }
  }, 100)
})

module.exports = router
