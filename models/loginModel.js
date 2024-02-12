class LoginModel {
    constructor(email, password) {
        
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            throw new Error('Invalid email');
        }

        
        if (!password || typeof password !== 'string' || password.length < 6) {
            throw new Error('Invalid password');
        }

        this.email = email;
        this.password = password;
    }
}


