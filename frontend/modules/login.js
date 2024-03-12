import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('subimt', e => {
            e.preventDefault();
            this.validate();
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        let error = false;
        if(!validator.isEmail(emailInput)) {
            alert('Email inválido');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 15) {
            alert('Senha inválido');
            error = true;
        }
        if(!error) el.submit;
    }
}