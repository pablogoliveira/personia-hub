
const personService = require('../services/personService');

exports.createPerson = async (req, res, next) => {
  try {
    const personData = req.body;
    
    // BFF can perform additional validation or data transformation here
    
    const createdPerson = await personService.createPerson(personData);
    res.status(201).json(createdPerson);
  } catch (error) {
    next(error);
  }
};

exports.getPerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await personService.getPerson(id);
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};

exports.listPersons = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await personService.listPersons(
      parseInt(page),
      parseInt(limit),
      search
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.updatePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const personData = req.body;
    
    // BFF can perform additional validation or data transformation here
    
    const updatedPerson = await personService.updatePerson(id, personData);
    res.status(200).json(updatedPerson);
  } catch (error) {
    next(error);
  }
};

exports.deletePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    await personService.deletePerson(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
