const { flashcard } = require("../models");
const createResponse = require("../utils/response");

const getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await flashcard.findAll();
    const count = flashcards.length;

    res.send(
      createResponse(200, "Flashcards retrieved successfully", {
        count,
        data: flashcards,
      })
    );
  } catch (error) {
    console.error("Error retrieving flashcards:", error);
    res.send(createResponse(500, "Internal server error", null, error.message));
  }
};

const getFlashcardById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await flashcard.findByPk(id);
    if (!data) {
      return res.send(
        createResponse(404, "Flashcard not found", null, "Flashcard not found")
      );
    }
    res.send(createResponse(200, "Flashcard retrieved successfully", data));
  } catch (error) {
    console.error("Error retrieving flashcard:", error);
    res.send(createResponse(500, "Internal server error", null, error.message));
  }
};

const createFlashcard = async (req, res) => {
  const { question, answer } = req.body;
  try {
    await flashcard.create({ question, answer });

    req.io.emit("refetch", { key: "flashcardlist" });
    req.io.emit("notification", { msg: "New Flashcard added" });

    res.status(201).send(createResponse(201, "Flashcard created successfully"));
  } catch (error) {
    console.error("Error creating flashcard:", error);
    res.send(createResponse(500, "Internal server error", null, error.message));
  }
};

const deleteFlashcardById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await flashcard.findByPk(id);
    if (!data) {
      return res.send(
        createResponse(404, "Flashcard not found", null, "Flashcard not found")
      );
    }
    await data.destroy();

    req.io.emit("refetch", { key: "flashcardlist" });

    res.send(createResponse(200, "Flashcard deleted successfully"));
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    next(error); // Pass error to global error handler
  }
};

const deleteFlashcards = async (req, res) => {
  try {
    const deletedCount = await flashcard.destroy({ where: {}, truncate: true });

    req.io.emit("refetch", { key: "flashcardlist" });

    res.send(
      createResponse(200, "All flashcards deleted successfully", {
        deletedCount,
      })
    );
  } catch (error) {
    console.error("Error deleting flashcards:", error);
    res.send(createResponse(500, "Internal server error", null, error.message));
  }
};

const updateFlashcard = async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;
  try {
    const item = await flashcard.findByPk(id);
    if (!item) {
      return res.send(
        createResponse(404, "Flashcard not found", null, "Flashcard not found")
      );
    }

    item.question = updatedData.question || item.question;
    item.answer = updatedData.answer || item.answer;

    await item.save();

    req.io.emit("refetch", { key: "flashcardlist" });

    res.send(createResponse(200, "Flashcard updated successfully", item));
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.send(createResponse(500, "Internal server error", null, error.message));
  }
};

module.exports = {
  getAllFlashcards,
  getFlashcardById,
  createFlashcard,
  deleteFlashcardById,
  deleteFlashcards,
  updateFlashcard,
};
