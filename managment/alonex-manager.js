export default class Alonex {
    constructor() {
        this.state = {}
        this.methods = {}
        this.actions = {}
    }

    start(methodName, data) {
        if (this.methods[methodName] !== undefined) {
            this.methods[methodName](this.state, data)
        } else {
            console.error(`${methodName} is not a method`)
        }
    }

    createStore(alonexSeed) {
        const {
            state,
            methods,
            actions,
            firstEmployee,
            lastEmployee
        } = alonexSeed

        new Promise((resolve, reject) => {
            for (const prop in firstEmployee) {
                firstEmployee[prop]()
            }

            resolve(true)
        })
        .then(() => this.state = state)
        .then(() => this.methods = methods)
        .then(() => this.actions = actions)
        .then(() => {
            for (const prop in lastEmployee) {
                lastEmployee[prop]({state: this.state})
            }
        })

    }
}