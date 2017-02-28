import express from 'express'
import busboy from 'connect-busboy'
import fs from 'fs-extra'
import fileSystem from 'fs'
import cors from 'cors'
import json2csv from 'json2csv'

const app = express()
const imagePath = `${__dirname}/uploads/cards/`
const csvFile = `${__dirname}/uploads/cards/data.csv`
const newLine = '\r\n'
app.use(busboy())
app.use(cors())

/* ==========================================================
Create a Route (/upload) to handle the Form submission
(handle POST requests to /upload)
Express v4  Route definition
============================================================ */
app.route('/upload')
  .post((req, res) => {
    let fstream
    const params = {}
    req.pipe(req.busboy)
    req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      // console.log('File [' + ${fieldname} + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
      // console.log("Uploading: " + filename)
      // Path where image will be uploaded
      const id = new Date().getTime() + Math.random()
      const imageFilename = `${id}.${params.name}.jpeg`
      fstream = fs.createWriteStream(imagePath + imageFilename)
      params.image = imageFilename
      file.pipe(fstream)
      fstream.on('close', () => {
        const fields = []
        for(const k in params) {
          if (params.hasOwnProperty(k)) {
            fields.push(k)
          }
        }
        fileSystem.stat(csvFile, (err) => {
          let csv
          if (err == null) {
            console.log('File exists')
            csv = json2csv({
              data: [params],
              fields,
              hasCSVColumnTitle: false,
            }) + newLine
            fileSystem.appendFile(csvFile, csv, (err) => {
              if (err) throw err
              console.log('The "data to append" was appended to file!')
            })
          } else {
            // write the headers and newline
            console.log('New file, just writing headers')
            csv = json2csv({
              data: [params],
              fields,
            }) + newLine
            fileSystem.writeFile(csvFile, csv, (err) => {
              if (err) throw err
              console.log('file saved')
            })
          }
        })
        console.log(`Upload Finished of  + ${filename}`)
        res.redirect('back') // where to go next
      })
    })
    req.busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      // console.log('Field [' + fieldname + ']: value: ' + (val))
      params[fieldname] = val
    })
    req.busboy.on('finish', () => {
      console.log('Done parsing form!')
    })
  })

const server = app.listen(3030, () => {
  console.log('Listening on port %d', server.address().port)
})
