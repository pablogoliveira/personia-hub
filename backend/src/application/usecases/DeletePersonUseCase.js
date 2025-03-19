
class DeletePersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(id) {
    // Check if person exists
    const existingPerson = await this.personRepository.findById(id);
    if (!existingPerson) {
      throw new Error('Pessoa não encontrada');
    }
    
    // Delete the person
    await this.personRepository.delete(id);
    
    return { success: true };
  }
}

module.exports = DeletePersonUseCase;
