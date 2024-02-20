const mongoose = require('mongoose');

//estupulando as regras para a criação de dados no mongoDB (que é noSQL)
const zSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String
});

const zModel = mongoose.model('z', zSchema);   

module.exports = zModel;