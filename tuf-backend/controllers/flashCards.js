const { flashcard } = require('../models');
const createResponse = require('../utils/response');

const getAllFlashcards =async (req, res) => {
    try {
      let count = 0
      const flashcards = await flashcard.findAll();
      
      if(flashcards) {
        count=flashcards.length
      }
      res.send(createResponse(
        200,
        "ok",
        {
          count,
          data: flashcards
        },
  
      ));
    } catch (error) {
      console.error("Error retrieving flashcards:", error);
      throw error; // Or handle the error appropriately
    }
  }

const getFlashcardById = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await flashcard.findByPk(id);
      if (!data) {
        throw new Error("Flashcard not found");
      }
      res.send(createResponse(200, "ok", data));
    } catch (error) {
      console.error("Error retrieving flashcard:", error);
      throw error; // Or handle the error appropriately
    }
  }



const createFlashcard = async (req, res) => {
    const { question, answer } = req.body;
    try{
        await flashcard.create({
            question,
            answer
        })
        res.send(createResponse(201, "Flashcard created"));
    }catch(error){
        console.error("Error creating flashcard:", error);
    }
    
}

const deleteFlashcardById = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await flashcard.findByPk(id);
      if (!data) {
        throw new Error("Flashcard not found");
      }
      await data.destroy();
      res.send(createResponse(200, "Deletion Successful"));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
      throw error; // Or handle the error appropriately
    }
}

const deleteFlashCard =async (req, res) => {
    try {
      const deletedCount = await flashcard.destroy({
        where: {},
        truncate: true
      });
      res.send(createResponse(200, 'Items deleted successfully', { deletedCount }))
    } catch (error) {
      console.error('Error deleting items:', error);
      res.send(createResponse(500, 'Internal server error', null, error.message))
    }
  }

module.exports = {getAllFlashcards, getFlashcardById, deleteFlashCard , deleteFlashcardById ,createFlashcard}


