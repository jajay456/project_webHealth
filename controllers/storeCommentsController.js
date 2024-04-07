const Comments = require('../models/Comments')

module.exports = (req, res) => {
    Comments.create(req.body).then(() => {
        console.log("Comments successfully!")

    })
}