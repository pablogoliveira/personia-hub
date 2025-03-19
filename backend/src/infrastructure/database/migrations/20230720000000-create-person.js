
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('persons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        field: 'data_nascimento'
      },
      nome_mae: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'nome_mae'
      },
      rg: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true
      },
      cep: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      logradouro: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      numero: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      complemento: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      bairro: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cidade: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('persons');
  }
};
