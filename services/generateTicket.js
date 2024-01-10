// Example function to generate a random ticket number
const generateTicketNumber = () => {
  // Implement your logic to generate a unique ticket number
  return "TICKET_" + Math.floor(Math.random() * 1000000);
};

module.exports = generateTicketNumber;
