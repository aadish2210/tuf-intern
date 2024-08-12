
module.exports = (sequelize , DataTypes) => {
    const flashcard = sequelize.define('flashcard', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,   
    
        },
      });

      return flashcard
}