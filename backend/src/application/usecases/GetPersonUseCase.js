
class GetPersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(id) {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error('Pessoa não encontrada');
    }
    return person;
  }
}

module.exports = GetPersonUseCase;
