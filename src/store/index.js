import Alonex from '../../managment/alonex-manager.js'

const alonex = new Alonex()

alonex.createStore({
    firstEmployee: {},
    lastEmployee: {},
    state: {
        title: "Alone.js App"
    },
    methods: {},
    actions: {}
})

export default alonex