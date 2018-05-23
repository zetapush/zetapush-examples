module.exports = class Api {
    /**
   * Explicit injected platform services
   * @returns {Object[]}
   */
    static get injected() {
        return [];
    }
    /**
     * Api constructor, receive injected services
     */
    constructor() {
        console.log('Api:constructor');
    }

    /**
     * Get an Hello World string with server side timestamp value
     * @returns {string}
     */
    async hello() {
        return "Hello world";
    }


}