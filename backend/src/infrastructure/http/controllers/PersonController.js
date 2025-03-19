
class PersonController {
  constructor(
    createPersonUseCase,
    getPersonUseCase,
    listPersonsUseCase,
    updatePersonUseCase,
    deletePersonUseCase
  ) {
    this.createPersonUseCase = createPersonUseCase;
    this.getPersonUseCase = getPersonUseCase;
    this.listPersonsUseCase = listPersonsUseCase;
    this.updatePersonUseCase = updatePersonUseCase;
    this.deletePersonUseCase = deletePersonUseCase;
  }

  async create(req, res) {
    try {
      const personData = req.body;
      const createdPerson = await this.createPersonUseCase.execute(personData);
      
      return res.status(201).json(createdPerson);
    } catch (error) {
      console.error('Create person error:', error);
      
      if (error.message.includes('já cadastrado') || 
          error.message.includes('inválido') ||
          error.message.includes('obrigatórios')) {
        return res.status(400).json({
          status: 400,
          error: 'Bad Request',
          message: error.message
        });
      }
      
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao criar pessoa'
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const person = await this.getPersonUseCase.execute(id);
      
      return res.status(200).json(person);
    } catch (error) {
      console.error('Get person error:', error);
      
      if (error.message.includes('não encontrada')) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
          message: error.message
        });
      }
      
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao buscar pessoa'
      });
    }
  }

  async list(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await this.listPersonsUseCase.execute({
        page: parseInt(page),
        limit: parseInt(limit),
        search
      });
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('List persons error:', error);
      
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao listar pessoas'
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const personData = req.body;
      const updatedPerson = await this.updatePersonUseCase.execute(id, personData);
      
      return res.status(200).json(updatedPerson);
    } catch (error) {
      console.error('Update person error:', error);
      
      if (error.message.includes('não encontrada')) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
          message: error.message
        });
      }
      
      if (error.message.includes('já cadastrado') || 
          error.message.includes('inválido') ||
          error.message.includes('obrigatórios')) {
        return res.status(400).json({
          status: 400,
          error: 'Bad Request',
          message: error.message
        });
      }
      
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao atualizar pessoa'
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.deletePersonUseCase.execute(id);
      
      return res.status(204).send();
    } catch (error) {
      console.error('Delete person error:', error);
      
      if (error.message.includes('não encontrada')) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
          message: error.message
        });
      }
      
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao excluir pessoa'
      });
    }
  }
}

module.exports = PersonController;
