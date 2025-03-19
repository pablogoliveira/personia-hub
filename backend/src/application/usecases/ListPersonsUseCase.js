
class ListPersonsUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute({ page = 1, limit = 10, search = '' }) {
    return await this.personRepository.findAll(page, limit, search);
  }
}

module.exports = ListPersonsUseCase;
