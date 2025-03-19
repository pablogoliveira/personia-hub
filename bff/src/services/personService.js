
const axios = require('axios');

class PersonService {
  constructor() {
    this.apiUrl = process.env.BACKEND_API_URL;
    this.client = axios.create({
      baseURL: `${this.apiUrl}/api`
    });
  }

  async createPerson(personData) {
    try {
      const response = await this.client.post('/pessoas', personData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async getPerson(id) {
    try {
      const response = await this.client.get(`/pessoas/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async listPersons(page = 1, limit = 10, search = '') {
    try {
      const response = await this.client.get('/pessoas', {
        params: { page, limit, search }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async updatePerson(id, personData) {
    try {
      const response = await this.client.put(`/pessoas/${id}`, personData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async deletePerson(id) {
    try {
      await this.client.delete(`/pessoas/${id}`);
      return { success: true };
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
}

module.exports = new PersonService();
