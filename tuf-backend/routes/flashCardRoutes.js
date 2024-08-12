const express = require('express')

const{
    getAllFlashcards,
    getFlashcardById,
    createFlashcard,
    deleteFlashCard,
    deleteFlashcardById

} = require('../controllers/flashCards')

const router = express.Router()


router.get('/', getAllFlashcards)

router.get('/:id', getFlashcardById)

router.post('/', createFlashcard)

router.delete('/', deleteFlashCard)

router.delete('/:id', deleteFlashcardById)

module.exports = router