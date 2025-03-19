
const express = require('express');
const router = express.Router();

// Controller
const PersonController = require('../controllers/PersonController');

// Use cases
const CreatePersonUseCase = require('../../../application/usecases/CreatePersonUseCase');
const GetPersonUseCase = require('../../../application/usecases/GetPersonUseCase');
const ListPersonsUseCase = require('../../../application/usecases/ListPersonsUseCase');
const UpdatePersonUseCase = require('../../../application/usecases/UpdatePersonUseCase');
const DeletePersonUseCase = require('../../../application/usecases/DeletePersonUseCase');

// Repository implementation
const SequelizePersonRepository = require('../../repositories/SequelizePersonRepository');

// Initialize dependencies
const personRepository = new SequelizePersonRepository();
const createPersonUseCase = new CreatePersonUseCase(personRepository);
const getPersonUseCase = new GetPersonUseCase(personRepository);
const listPersonsUseCase = new ListPersonsUseCase(personRepository);
const updatePersonUseCase = new UpdatePersonUseCase(personRepository);
const deletePersonUseCase = new DeletePersonUseCase(personRepository);

// Initialize controller
const personController = new PersonController(
  createPersonUseCase,
  getPersonUseCase,
  listPersonsUseCase,
  updatePersonUseCase,
  deletePersonUseCase
);

// Routes
router.post('/', (req, res) => personController.create(req, res));
router.get('/', (req, res) => personController.list(req, res));
router.get('/:id', (req, res) => personController.getById(req, res));
router.put('/:id', (req, res) => personController.update(req, res));
router.delete('/:id', (req, res) => personController.delete(req, res));

module.exports = router;
