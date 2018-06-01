module.exports = class Api {
    static get parameters() {
        return [];
    }
    constructor() { }

    async hello() {
        return `Hello World at ${new Date().toLocaleDateString('fr-FR')}`;
    }
}