'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Read the JSON file
    const filePath = path.join(__dirname, './questions.json');
    const rawData = fs.readFileSync(filePath);
    const questions = JSON.parse(rawData);

    // Map the JSON data to fit the flashcard model
    const flashcards = questions.map((item) => ({
      question: item.question,
      answer: item[item.answer],  // Fetches the correct answer based on the key (e.g., 'A', 'B', 'C', or 'D')
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert the data into the flashcards table
    await queryInterface.bulkInsert('flashcards', flashcards, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('flashcards', null, {});
  }
};
