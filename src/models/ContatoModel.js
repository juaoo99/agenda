const mongoose = require('mongoose');
const validator = require('validator');

//estupulando as regras para a criação de dados no mongoDB (que é noSQL)
const ContatoSchema = new mongoose.Schema({
    nome: { type : String, required: true},
    sobrenome: {type : String, required: false, default: ''},
    email: {type : String, required : true},
    telefone: { type : String, required : true},
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);   

function Contato (body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById();
    return user;
}

Contato.prototype.register = async function() {
    this.valida();

    if(this.errors.length > 0 ) return;
    
    this.contato = await ContatoModel.create(this.body);
}


Contato.prototype.valida = function() {
    this.cleanUp();
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');

    if(this.body.name == 0) this.errors.push('O nome é obrigatório');

    if(!this.body.email && !this.body.telefone) this.errors.push('Adicionar ao menos um contato (email ou telefone)');
}

Contato.prototype.cleanUp = function() {
    for(const key in this.body) { 
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}


module.exports = Contato;