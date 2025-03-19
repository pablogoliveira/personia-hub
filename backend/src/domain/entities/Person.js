
class Person {
  constructor({
    id,
    nome,
    dataNascimento,
    nomeMae,
    rg,
    cpf,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    telefone,
    email
  }) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.nomeMae = nomeMae;
    this.rg = rg;
    this.cpf = cpf;
    this.cep = cep;
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.telefone = telefone;
    this.email = email;
  }

  // Domain validation methods could be added here
  validate() {
    if (!this.nome || !this.dataNascimento || !this.nomeMae || !this.rg || !this.cpf ||
        !this.cep || !this.logradouro || !this.numero || !this.bairro || 
        !this.cidade || !this.estado || !this.telefone || !this.email) {
      throw new Error('Todos os campos são obrigatórios exceto complemento');
    }
    
    this.validateCpf(this.cpf);
    this.validateEmail(this.email);
    this.validatePhone(this.telefone);
    
    return true;
  }

  validateCpf(cpf) {
    // Remove special characters
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Check if it has 11 digits
    if (cpf.length !== 11) {
      throw new Error('CPF inválido');
    }
    
    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cpf)) {
      throw new Error('CPF inválido');
    }
    
    // CPF validation algorithm
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      throw new Error('CPF inválido');
    }
    
    sum = 0;
    
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      throw new Error('CPF inválido');
    }
    
    return true;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('E-mail inválido');
    }
    return true;
  }

  validatePhone(phone) {
    // Remove special characters
    phone = phone.replace(/\D/g, '');
    
    // Phone with DDD should have 10 or 11 digits
    if (phone.length < 10 || phone.length > 11) {
      throw new Error('Telefone inválido');
    }
    
    return true;
  }
}

module.exports = Person;
