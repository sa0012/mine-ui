const fs = require('fs')
const path = require('path')

function readSassContent () {
  const iconPath = path.resolve(__dirname, '../src/common/font/iconfont.css')
  const filePath = path.resolve(__dirname, '../src/common/font/iconfont.json')
  fs.readFile(iconPath, 'utf-8', function (err, data) {
    if (err) {
      console.error(err, 'error')
    } else {
      const str = data.toString()
      const matchReg = /(?<=ml-icon-).*?(?=:before)/gi
      const iconList = str.match(matchReg)
      const parseJSON = JSON.stringify(iconList)
      console.log(iconList, iconList.length, 'iconList')
      fs.writeFile(filePath, parseJSON, 'utf-8', err => {
        if (err) {
          console.error(err, 'error')
        } else {
          console.log('write success')
        }
      })
    }
  })
}

readSassContent()
