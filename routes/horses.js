var express = require('express');
const horse_controlers= require('../controllers/horse');
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
    }
 
/* GET home page. */
router.get('/', horse_controlers.horse_view_all_Page);
/* GET detail costume page */
router.get('/detail', horse_controlers.horse_view_one_Page);
/* GET create costume page */
router.get('/create',secured, horse_controlers.horse_create_Page);
/* GET create update page */
router.get('/update',secured, horse_controlers.horse_update_Page);
/* GET create costume page */
router.get('/delete',secured, horse_controlers.horse_delete_Page);


module.exports = router;