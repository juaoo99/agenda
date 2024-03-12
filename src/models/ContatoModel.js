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

Contato.prototype.register = async function() {
    this.valida();

    if(this.errors.length > 0 ) return;
    
    this.contato = await ContatoModel.create(this.body);
}


Contato.prototype.valida = function() {
    this.cleanUp();
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');

    if(!this.body.nome) this.errors.push('O nome é obrigatório');

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


Contato.prototype.edit = async function (id) {
    if(typeof id !== 'string') return null; // Alterado para retornar null se o id não for uma string
    this.valida();

    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
}


//Metodos estaticos
Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return null; // Alterado para retornar null se o id não for uma string
    const contato = await ContatoModel.findById(id); // Corrigido para passar o id para findById
    return contato;
}

Contato.buscaContatos = async function() {
    const contatos = await ContatoModel.find()
    .sort({ criadoEm: -1 });
    return contatos;
}

Contato.delete = async function(id) {
    if(typeof id !== 'string') return null;
    const contatos = await ContatoModel.findOneAndDelete( {_id : id} );
    return contatos;
}




module.exports = Contato;