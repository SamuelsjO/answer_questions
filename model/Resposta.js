const Sequelize = require('sequelize')
const connection = require("./../data_base/data_base")

const Resposta = connection.define("respostas",{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false})

module.exports = Resposta;