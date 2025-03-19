
const Person = require('../../domain/entities/Person');

class UpdatePersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(id, personData) {
    // Check if person exists
    const existingPerson = await this.personRepository.findById(id);
    if (!existingPerson) {
      throw new Error('Pessoa não encontrada');
    }

    // Create a domain entity
    const person = new Person({ ...personData, id });
    
    // Validate domain rules
    person.validate();
    
    // Check if CPF already exists (if changed)
    if (person.cpf !== existingPerson.cpf) {
      const existingCpf = await this.personRepository.findByCpf(person.cpf);
      if (existingCpf) {
        throw new Error('CPF já cadastrado');
      }
    }
    
    // Check if email already exists (if changed)
    if (person.email !== existingPerson.email) {
      const existingEmail = await this.personRepository.findByEmail(person.email);
      if (existingEmail) {
        throw new Error('E-mail já cadastrado');
      }
    }
    
    // Update the person
    const updatedPerson = await this.personRepository.update(id, person);
    
    return updatedPerson;
  }
}

module.exports = UpdatePersonUseCase;
