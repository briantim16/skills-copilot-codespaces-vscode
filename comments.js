// Create web server comments
// 2019-03-16
// ---------------------------------------------------------------------------

// Import the express module
const express = require('express');

// Create the router
const router = express.Router();

// Import the database module
const db = require('../db');

// ---------------------------------------------------------------------------
// GET
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
    // Get all comments
    db.query('SELECT * FROM comments', (err, results) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(results);
        }
    });
});

// ---------------------------------------------------------------------------
// POST
// ---------------------------------------------------------------------------
router.post('/', (req, res) => {
    // Create a new comment
    db.query('INSERT INTO comments SET ?', req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.status(201).send(req.body);
        }
    });
});

// ---------------------------------------------------------------------------
// PUT
// ---------------------------------------------------------------------------
router.put('/:id', (req, res) => {
    // Update a comment
    db.query('UPDATE comments SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

// ---------------------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------------------
router.delete('/:id', (req, res) => {
    // Delete a comment
    db.query('DELETE FROM comments WHERE id = ?', req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

// Export the router
module.exports = router;