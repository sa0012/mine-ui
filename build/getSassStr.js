const fs = require('fs')
const path = require('path')

function readSassContent () {
  const iconPath = path.resolve(__dirname, '../src/common/font/iconfont.scss')
  const filePath = path.resolve(__dirname, '../src/common/font/iconfont.js')
  fs.readFile(iconPath, 'utf-8', function (err, data) {
    if (err) {
      console.error(err, 'error')
    } else {
      // console.log(data, 'data')
      const str = data.split(':before')
      const reg = /^(\.ml-icon-(\w|-)+:before)/g
      console.log(str)
      // const str = `export default () => {
      //   return ${data}
      // }`
      // console.log(str, 'str')
      // fs.writeFile(filePath, str, 'utf-8', err => {
      //   if (err) {
      //     console.error(err, 'error')
      //   } else {
      //     console.log('write success')
      //   }
      // })
    }
  })
}

readSassContent()
