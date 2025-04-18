const router = require('express').Router();
let ScoreEntry = require('../models/scoreEntry.model');

router.route('/').get((req,res) => {
    ScoreEntry.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req,res) => {
    ScoreEntry.create(req.body);
});

module.exports = router;