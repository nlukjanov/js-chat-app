'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ChatRooms', ['name'], {
      type: 'unique',
      name: 'unique_name'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ChatRooms', 'unique_name');
  }
};
