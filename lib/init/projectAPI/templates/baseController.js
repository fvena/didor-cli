'use strict';

// {{routeName.plurialUp}} SEQUELIZE ROUTER
module.exports = (app, db) => {

  // GET all {{routeName.plurial}}
  app.get('/{{routeName.plurial}}', (req, res) => {
    db.{{routeName.plurialCap}}.findAll()
    .then({{routeName.plurial}} => {
      res.json({{routeName.plurial}});
    }).catch(db.Sequelize.ValidationError, err => {
      return res.status(422).send(err.errors);
    }).catch(err => {
      return res.status(400).json(err.errors);
    })
  });

  // GET one {{routeName.singular}} by id
  app.get('/{{routeName.plurial}}/:id', (req, res) => {
    db.{{routeName.plurialCap}}.find({
      where: { id: req.params.id }
    })
    .then({{routeName.singular}} => {
      res.json({{routeName.singular}});
    }).catch(db.Sequelize.ValidationError, err => {
      return res.status(422).send(err.errors);
    }).catch(err => {
      return res.status(400).json(err.errors);
    })
  });

  // POST single {{routeName.singular}}
  app.post('/{{routeName.plurial}}', (req, res) => {
    db.{{routeName.plurialCap}}.create({
      {{routeName.postData}}
    })
    .then(new{{routeName.singularCap}} => {
      res.json(new{{routeName.singularCap}});
    }).catch(db.Sequelize.ValidationError, err => {
      return res.status(422).send(err.errors);
    }).catch(err => {
      return res.status(400).json(err.errors);
    })
  });

  // PATCH single {{routeName.singular}}
  app.patch('/{{routeName.plurial}}/:id', (req, res) => {
    db.{{routeName.plurialCap}}.find({
      where: { id: req.params.id }
    })
    .then({{routeName.plurial}} => {
      return {{routeName.plurial}}.updateAttributes(req.body.updates)
    })
    .then(updated{{routeName.singularCap}} => {
      res.json(updated{{routeName.singularCap}});
    }).catch(db.Sequelize.ValidationError, err => {
      return res.status(422).send(err.errors);
    }).catch(err => {
      return res.status(400).json(err.errors);
    })
  });

  // DELETE single {{routeName.singular}}
  app.delete('/{{routeName.plurial}}/:id', (req, res) => {
    db.{{routeName.plurialCap}}.destroy({
      where: { id: req.params.id }
    })
    .then(deleted{{routeName.singularCap}} => {
      res.json(deleted{{routeName.singularCap}});
    }).catch(db.Sequelize.ValidationError, err => {
      return res.status(422).send(err.errors);
    }).catch(err => {
      return res.status(400).json(err.errors);
    })
  });
};
