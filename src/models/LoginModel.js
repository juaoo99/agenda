const mongoose = require('mongoose');
const validator = require('validator');//adicionado para validar se o email é valido
const bcrypt = require('bcryptjs');//adicionado para esconder a senha 

//estupulando as regras para a criação de dados no mongoDB (que é noSQL)
const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);   


class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.errors > 0) return; 

        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user) {
           this.errors.push('Usuário não existe'); 
           return;
        } 

        if(!bcrypt.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    async register() {
        this.valida();
        if(this.errors > 0) return;
        
        await this.userExist();

        if(this.errors > 0) return;
        
        const salt = await bcrypt.genSalt();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);

    }

    async userExist() {
        if(this.user) this.errors.push('Usuário ja existe');
    }


    valida () {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido');}

        if(this.body.password.length < 3 || this.body.password.length >= 20 ) {
            this.errors.push('Senha inválida');
        }
    }

    cleanUp () {
        for(const key in this.body) { 
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    };
}


module.exports = Login;