import Coox from '../../managment/coox-manager.js'

const store = new Coox({
    first: ({state, actions}) => {},
    state: {},
    mutations: {},
    actions: {}
})

store.createCoox()

export default store