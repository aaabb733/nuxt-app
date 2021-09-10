const express = require("express")
const app = express()
const Youtube = require("youtube-api")

app.get("/", (req,res) => {
    if (req.query.id) {
        Youtube.channels.list({
            part: "snippet",
            id: req.query.id,
            key: "aaa"
        }).then(user => {
            res.send(user)
        }).catch(e => {
            res.status(404).send(e)
        })
    } else if (req.query.username) {
        res.send("username is " + req.query.username)
    } else {
        res.status(404).send("please give id or username")
    }
})

app.get("/users", (req, res) => {
    res.send("hello")
})

module.exports = app