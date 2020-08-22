class Auth {
    constructor() {
        localStorage.AuthToken ? this.authenticated = true : this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();