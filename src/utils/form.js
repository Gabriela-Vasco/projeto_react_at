const validateEmail = (email) => {
    if (!email) {
        return { error: true, helperText: 'E-mail é obrigatório' };
    }
    
    const re = /\S+@\S+\.\S+/;

    if(!re.test(email)) {
        return { error: true, helperText: 'E-mail não é válido' };
    } else {
        return { error: false, helperText: '' };
    }
}

const validatePassword = (password) => {
    if (!password) {
        return { error: true, helperText: 'Senha é obrigatória' };
    }

    if(password.length < 6) {
        return { error: true, helperText: 'Senha deve ter no mínimo 6 caracteres' };
    } else {
        return { error: false, helperText: '' };
    }
}

const validateNumericFields = (fields) => {
    for(const field of fields) {
        if (typeof field !== 'number' && !Number(field)) {
            return 'Campo deve ser numérico';
        }
    }
    return ''
}

export { validateEmail, validatePassword, validateNumericFields }