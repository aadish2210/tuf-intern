const express = require('express');

const{
    getAllFlashcards,
    getFlashcardById,
    createFlashcard,
    deleteFlashcards,
    deleteFlashcardById,
    updateFlashcard

} = require('../controllers/flashCards');

const router = express.Router();

router.get('/', getAllFlashcards);

router.get('/:id', getFlashcardById);

router.post('/', createFlashcard);

router.delete('/', deleteFlashcards);

router.delete('/:id', deleteFlashcardById);

router.post("/:id" , updateFlashcard);

module.exports = router;