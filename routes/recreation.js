var express = require("express");
var router = express.Router();
var Recreation = require("../models/recreationDB");

router.get("/recreation", function (req, res) {
    console.log(req.user);
    Recreation.find({}, function (err, allRecreation) {
        if (err) {
            console.log(err);
        } else {
            res.render("recreation", { recreationCollection: allRecreation });
        }
    });
});
router.post("/newRecreation", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var country = req.body.country;
    var city = req.body.city;
    var minPrice = req.body.minPrice;
    var maxPrice = req.body.maxPrice;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRecreation = {
        name: name,
        image: image,
        description: description,
        country: country,
        city: city,
        minPrice: minPrice,
        maxPrice: maxPrice,
        author: author
    }
    Recreation.create(newRecreation, function (err, newCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newCreated);
            res.redirect("/recreation");
        }
    });
});
router.get("/adminRecreation", function (req, res) {
    res.render("adminRecreation");
});
router.get("/recreation/:id", function (req, res) {
    Recreation.findById(req.params.id).populate("comments").exec(function (err, foundRecreation) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundRecreation);
            res.render("detailRecreation", {
                recreation: foundRecreation
            });
        }
    })
});

module.exports = router;
