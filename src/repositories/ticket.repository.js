// src/repositories/ticket.repository.js

const ticketDAO = require('../dao/ticket.dao');
const TicketDTO = require('../dtos/ticket.dto');
const { v4: uuidv4 } = require('uuid');

class TicketRepository {
  async create({ amount, purchaser }) {
    // Genera un código único
    const code = uuidv4();
    const t    = await ticketDAO.create({ code, amount, purchaser });
    return new TicketDTO(t);
  }

  async getById(id) {
    const t = await ticketDAO.getById(id);
    return t ? new TicketDTO(t) : null;
  }
}

module.exports = new TicketRepository();
