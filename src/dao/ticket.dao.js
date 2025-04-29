const BaseDAO = require('./base.dao');
const Ticket = require('../models/ticket.model');

class TicketDAO extends BaseDAO {
  constructor() {
    super(Ticket);
  }
}

module.exports = new TicketDAO();
