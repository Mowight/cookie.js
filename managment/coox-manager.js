export default class Coox {
    constructor(state, methods, actions) {
        this.state = state
        this.methods = methods
        this.actions = actions
    }

    start(methodName, data) {
        if (this.methods[methodName] !== undefined) {
            this.methods[methodName](this.state, data)
        } else {
            console.error(`${methodName} is not a method`)
        }
    }
}