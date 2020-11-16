export default class Coox {
    constructor(props) {
        this.first = props.first
        this.state = props.state
        this.mutations = props.mutations
        this.actions = props.actions
        this.history = {
            mode: false,
            data: {}
        }
    }

    createHistory() {
        this.history.mode = true
    }

    historyUse(mutationName, data) {
        this.mutations[mutationName](this.state, data)
        let newData = {}

        if (this.history.mode) {
            newData["mutationName"] = mutationName
            newData["outgoingData"] = data === undefined ? "no outgoing data" : data
            this.history.data = newData
        }
    }

    getHistory() {
        if (!this.history.mode) {
            console.warn('Past values ​​cannot be imported without creating a history. Create a history with "createHistory"')
        } else {
            return this.history.data
        }
    }

    use(mutationName, data) {
        if (this.mutations[mutationName] !== undefined) {
            this.history.mode ? //if
                this.historyUse(mutationName, data) 
            : // else
            this.mutations[mutationName](this.state, data)
        } else {
            console.error(`${mutationName} is not a mutation`)
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

        if (this.mutations === undefined) {
            console.error("mutation not found in coox")
        }

        if  (this.actions === undefined) {
            console.error("actions not found in coox")
        }
    }
}