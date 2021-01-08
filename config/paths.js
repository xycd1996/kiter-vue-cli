const path = require('path')

module.exports = {
  HtmlPath: path.resolve(process.cwd(), 'public/index.html'),
  AppPath: path.resolve(process.cwd(), 'src'),
  OutPutPath: path.resolve(process.cwd(), 'dist'),
  EntryPath: path.resolve(process.cwd(), 'src/main.js'),
  StaticPath: path.resolve(process.cwd(), 'static'),
}
