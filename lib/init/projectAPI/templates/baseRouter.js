const express = require('express');
const models = require('../../../config/models');

const router = express.Router();

// GET all {{routeName.plurial}}
router.get('/', (req, res) => {
  models.{{routeName.plurial}}.findAll()
  .then({{routeName.plurial}} => {
    res.json({{routeName.plurial}});
  }).catch(models.Sequelize.ValidationError, err => {
    return res.status(422).send(err.errors);
  }).catch(err => {
    return res.status(400).json(err.errors);
  })
});

// GET one {{routeName.singular}} by id
router.get('/:id', (req, res) => {
  models.{{routeName.plurial}}.find({
    where: { id: req.params.id }
  })
  .then({{routeName.singular}} => {
    res.json({{routeName.singular}});
  }).catch(models.Sequelize.ValidationError, err => {
    return res.status(422).send(err.errors);
  }).catch(err => {
    return res.status(400).json(err.errors);
  })
});

// POST single {{routeName.singular}}
router.post('/', (req, res) => {
  models.{{routeName.plurial}}.create({
    {{routeName.postData}}
  })
  .then(new{{routeName.singularCap}} => {
    res.json(new{{routeName.singularCap}});
  }).catch(models.Sequelize.ValidationError, err => {
    return res.status(422).send(err.errors);
  }).catch(err => {
    return res.status(400).json(err.errors);
  })
});

// PATCH single {{routeName.singular}}
router.patch('/:id', (req, res) => {
  models.{{routeName.plurial}}.find({
    where: { id: req.params.id }
  })
  .then({{routeName.plurial}} => {
    return {{routeName.plurial}}.updateAttributes(req.body.updates)
  })
  .then(updated{{routeName.singularCap}} => {
    res.json(updated{{routeName.singularCap}});
  }).catch(models.Sequelize.ValidationError, err => {
    return res.status(422).send(err.errors);
  }).catch(err => {
    return res.status(400).json(err.errors);
  })
});

// DELETE single {{routeName.singular}}
router.delete('/:id', (req, res) => {
  models.{{routeName.plurial}}.destroy({
    where: { id: req.params.id }
  })
  .then(deleted{{routeName.singularCap}} => {
    res.json(deleted{{routeName.singularCap}});
  }).catch(models.Sequelize.ValidationError, err => {
    return res.status(422).send(err.errors);
  }).catch(err => {
    return res.status(400).json(err.errors);
  })
});
