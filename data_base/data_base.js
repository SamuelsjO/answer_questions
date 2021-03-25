const Sequelize = require('Sequelize')

const connection = new Sequelize('answer_questions', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection