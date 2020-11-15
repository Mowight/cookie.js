export default class Real {
    constructor(value, id) {
        this.value = value
        this.referances = []
        this.id = id
    }

    startReferance() {
        for (let i in this.referances) {
            this.referances[i](this.value, this.id)
        }
    }

    set(newValue) {
        const el = document.querySelector(this.id)
        
        this.value = newValue
        
        if (el !== null) {
            el.innerHTML = this.value
            this.startReferance()
        } else {
            console.error(`Element with id ${this.id} id not found`)
        }
    }

    use(useItem) {
        if (typeof useItem === "function") {
            this.referances.push(useItem)
        } else {
            console.error("only functions real can be used.", "error reason: ", useItem)
        }
    }
}