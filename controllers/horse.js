var Horse = require('../models/horse');
// List of all Costumes
exports.horse_list = async function (req, res) {
    try {
        theHorses = await Horse.find();
        res.send(theHorses);
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};
// for a specific Costume.
exports.horse_detail = async function (req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await Horse.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Horse create on POST.
exports.horse_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Horse();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costumetype":"goat", "cost":12, "size":"large"}

    document.horsename = req.body.horsename;
    document.habitat = req.body.habitat;
    document.classification = req.body.classification;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};
// Handle Horse delete form on DELETE.
exports.horse_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Horse delete DELETE ' + req.params.id);
};
// Handle Horse update form on PUT.
exports.horse_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body 
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Horse.findById( req.params.id)
        // Do updates of properties
        if(req.body.horsename) toUpdate.horsename = req.body.horsename;
        if(req.body.habitat) toUpdate.habitat = req.body.habitat ;
        if(req.body.classification) toUpdate.classification = req.body.classification;
        if(req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
   
};

// VIEWS
// Handle a show all view
exports.horse_view_all_Page = async function (req, res) {
    try {
        theHorses = await Horse.find();
        res.render('horses', { title: 'Horse Search Results', results: theHorses });
    }
    catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};