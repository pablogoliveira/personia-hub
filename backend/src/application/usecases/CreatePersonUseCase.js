
const Person = require('../../domain/entities/Person');

class CreatePersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(personData) {
    // Create a domain entity
    const person = new Person(personData);
    
    // Validate domain rules
    person.validate();
    
    // Check if CPF already exists
    const existingCpf = await this.personRepository.findByCpf(person.cpf);
    if (existingCpf) {
      throw new Error('CPF já cadastrado');
    }
    
    // Check if email already exists
    const existingEmail = await this.personRepository.findByEmail(person.email);
    if (existingEmail) {
      throw new Error('E-mail já cadastrado');
    }
    
    // Persist the person
    const createdPerson = await this.personRepository.create(person);
    
    return createdPerson;
  }
}

module.exports = CreatePersonUseCase;
