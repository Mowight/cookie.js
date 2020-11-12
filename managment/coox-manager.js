export default class Coox {
    constructor(props) {
        this.firstEmployee = props.firstEmployee
        this.lastEmployee = props.lastEmployee
        this.state = props.state
        this.methods = props.methods
        this.actions = props.actions
    }

    start(methodName, data) {
        if (this.methods[methodName] !== undefined) {
            this.methods[methodName](this.state, data)
        } else {
            console.error(`${methodName} is not a method`)
        }
    }

    createCoox() {
        for (const prop in this.firstEmployee) {
            this.firstEmployee[prop]()
        }

        for (const prop in this.lastEmployee) {
            this.lastEmployee[prop]()
        }
    }
}