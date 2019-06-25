var express = require("express");
var router = express.Router();

var Hotel = require("../models/hotelDB");
var Resto = require("../models/restoDB");
var Comment = require("../models/comment");

// router.get("/hotel/:id/comments/new", isLoggedIn, function (req, res) {
//     Hotel.findById(req.params.id, function (err, hotel) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("comments/hotelComments", { hotel: hotel });
//         }
//     })
// })

router.post("/hotel/:id/comments", isLoggedIn, function (req, res) {
    Hotel.findById(req.params.id, function (err, hotel) {
        if (err) {
            console.log(err);
            res.redirect("/hotel");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    hotel.comments.push(comment);
                    hotel.save();
                    console.log(comment);
                    res.redirect("/hotel/" + hotel._id);
                }
            });
        }
    });
});

router.post("/resto/:id/comments", isLoggedIn, function (req, res) {
    Resto.findById(req.params.id, function (err, resto) {
        if (err) {
            console.log(err);
            res.redirect("/resto");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    resto.comments.push(comment);
                    resto.save();
                    console.log(comment);
                    res.redirect("/resto/" + resto._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;