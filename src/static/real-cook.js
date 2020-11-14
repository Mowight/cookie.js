class RealCook {
    constructor(value, id) {
        this.value = value
        this.id = id
    }

    set(newValue) {
        this.value = newValue

        const cookList = document.querySelectorAll(this.id)

        for (let i = 0; i < cookList.length; i++) {
            cookList[i].innerHTML = newValue
        }
    }
}

export default RealCook