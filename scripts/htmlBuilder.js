const fs = require('fs')
const nunjucks = require('nunjucks')
const nunjucksGlobals = require('../src/nunjucks/globals')
const env = nunjucks.configure(`${__dirname}/../src/`, {
  autoescape: true
})

nunjucksGlobals(env)

const htmlFilesToRender = new Promise((resolve, reject) => {
  fs.readdir('src/views/', (err, files) => {
    if (err) {
      reject(err)
    }

    resolve(files)
  })
})

htmlFilesToRender
  .then((fileNames) => {
    return fileNames.map((fileName) => {
      return {
        fileName: `${fileName.split('.')[0]}.html`,
        html: nunjucks.render(`views/${fileName}`)
      }
    })
  })
  .then((pageDetails) => {
    pageDetails.forEach((pageDetail) => {
      fs.writeFileSync(`dist/${pageDetail.fileName}`, pageDetail.html)
    })
  })
  .then(() => console.log('html files successfully built!'))
  .catch((err) => console.error(err))
