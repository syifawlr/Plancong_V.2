var express = require("express");
var router = express.Router();
var Resto = require("../models/restoDB");

router.get("/resto", function (req, res) {
    console.log(req.user);
    Resto.find({}, function (err, allResto) {
        if (err) {
            console.log(err);
        } else {
            res.render("resto", { restoCollection: allResto });
        }
    });
});

router.post("/newResto", function (req, res) {
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
    var newResto = {
        name: name,
        image: image,
        description: description,
        country: country,
        city: city,
        minPrice: minPrice,
        maxPrice: maxPrice,
        author: author
    }
    Resto.create(newResto, function (err, newCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newCreated);
            res.redirect("/resto");
        }
    });
});
router.get("/adminResto", function (req, res) {
    res.render("adminResto");
});
router.get("/resto/:id", function (req, res) {
    Resto.findById(req.params.id).populate("comments").exec(function (err, foundResto) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundResto);
            res.render("detailResto", {
                resto: foundResto
            });
        }
    })
});

module.exports = router;
