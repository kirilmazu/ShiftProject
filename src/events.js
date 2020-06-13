const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  return router;
}

module.exports = createRouter;

router.post('/event', (req, res, next) => {
    db.query(
      'INSERT INTO Employee (firstName, lastName, email, password, company, team, role) VALUES (?,?,?,?,?,?,?)',
      [owner, req.body.name, req.body.description, new Date(req.body.date)],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/event', function (req, res, next) {
    db.query(
      'SELECT password FROM Employee WHERE email=? ORDER BY date LIMIT 10 OFFSET ?',
      [owner, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/event/:id', function (req, res, next) {
    db.query(
      'UPDATE Employee SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


// i think we not need that
  router.delete('/event/:id', function (req, res, next) {
    db.query(
      'DELETE FROM Employee WHERE id=? AND owner=?',
      [req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.post('/event', (req, res, next) => {
    const owner = req.user.email;
    // db.query() code
  });
  
  router.get('/event', function (req, res, next) {
    const owner = req.user.email;
    // db.query() code
  });
  
  router.put('/event/:id', function (req, res, next) {
    const owner = req.user.email;
    // db.query() code
  });
  
  router.delete('/event/:id', function (req, res, next) {
    const owner = req.user.email;
    // db.query() code
  });