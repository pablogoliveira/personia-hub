
// This is the repository interface (port) in hexagonal architecture
class PersonRepository {
  async create(person) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async findById(id) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async findAll(page = 1, limit = 10, search = '') {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async update(id, person) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async delete(id) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async findByCpf(cpf) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async findByEmail(email) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PersonRepository;
