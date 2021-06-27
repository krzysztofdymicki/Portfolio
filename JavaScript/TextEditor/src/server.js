const express = require('express')
const path = require('path')
const expressFileUpload = require('express-fileupload')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(expressFileUpload())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.post('/', (req, res) => {
    console.log(req.files.file)
    if(req.files.file.mimetype === "application/json")
    {
        const json = req.files.file.data.toString('utf8')
        console.log(json)
        res.status(200).send(json)
    } else if (req.files.file.mimetype === "text/plain") {
        const text = req.files.file.data.toString('utf8')
        console.log(text)
        res.json({
            text: text
        })
    }
})

const PORT = process.env.PORT || 9999
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})