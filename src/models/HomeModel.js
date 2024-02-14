const mongoose = require('mongoose');

//estupulando as regras para a criação de dados no mongoDB (que é noSQL)
const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);   

module.exports = HomeModel;