export default class Coox {
    constructor(props) {
        this.first = props.first
        this.state = props.state
        this.methods = props.methods
        this.actions = props.actions
    }

    use(methodName, data) {
        if (this.methods[methodName] !== undefined) {
            this.methods[methodName](this.state, data)
        } else {
            console.error(`${methodName} is not a method`)
        }
    }

    uses(useList) {
        for (const prop in useList) {
            const argument = useList[prop]
            const methodName = prop

            if (this.methods[methodName] !== undefined) {
                this.methods[methodName](this.state, argument)
            } else {
                console.error(`Could not find a method named ${prop}`)
            }
        }
    }

    createCoox() {
        if (this.first !== undefined) {
            this.first({
                state: this.state,
                actions: this.actions
            })
        }

        if (this.state === undefined) {
            console.error("state not found in coox")
        }

        if (this.methods === undefined) {
            console.error("methods not found in coox")
        }

        if  (this.actions === undefined) {
            console.error("actions not found in coox")
        }
    }
}