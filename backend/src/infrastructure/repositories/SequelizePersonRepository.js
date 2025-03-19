
const PersonRepository = require('../../domain/repositories/PersonRepository');
const { Person } = require('../database/models');
const { Op } = require('sequelize');
const DomainPerson = require('../../domain/entities/Person');

class SequelizePersonRepository extends PersonRepository {
  async create(person) {
    const createdPerson = await Person.create({
      nome: person.nome,
      dataNascimento: person.dataNascimento,
      nomeMae: person.nomeMae,
      rg: person.rg,
      cpf: person.cpf,
      cep: person.cep,
      logradouro: person.logradouro,
      numero: person.numero,
      complemento: person.complemento,
      bairro: person.bairro,
      cidade: person.cidade,
      estado: person.estado,
      telefone: person.telefone,
      email: person.email
    });

    return new DomainPerson(createdPerson.toJSON());
  }

  async findById(id) {
    const person = await Person.findByPk(id);
    if (!person) return null;

    return new DomainPerson(person.toJSON());
  }

  async findAll(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit;
    
    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { nome: { [Op.like]: `%${search}%` } },
          { cpf: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ]
      };
    }
    
    const { count, rows } = await Person.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['nome', 'ASC']]
    });
    
    return {
      data: rows.map(person => new DomainPerson(person.toJSON())),
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    };
  }

  async update(id, person) {
    const [updated] = await Person.update({
      nome: person.nome,
      dataNascimento: person.dataNascimento,
      nomeMae: person.nomeMae,
      rg: person.rg,
      cpf: person.cpf,
      cep: person.cep,
      logradouro: person.logradouro,
      numero: person.numero,
      complemento: person.complemento,
      bairro: person.bairro,
      cidade: person.cidade,
      estado: person.estado,
      telefone: person.telefone,
      email: person.email
    }, {
      where: { id }
    });

    if (updated === 0) {
      return null;
    }

    const updatedPerson = await Person.findByPk(id);
    return new DomainPerson(updatedPerson.toJSON());
  }

  async delete(id) {
    const deleted = await Person.destroy({
      where: { id }
    });

    if (deleted === 0) {
      return false;
    }

    return true;
  }

  async findByCpf(cpf) {
    const person = await Person.findOne({
      where: { cpf }
    });

    if (!person) return null;

    return new DomainPerson(person.toJSON());
  }

  async findByEmail(email) {
    const person = await Person.findOne({
      where: { email }
    });

    if (!person) return null;

    return new DomainPerson(person.toJSON());
  }
}

module.exports = SequelizePersonRepository;
