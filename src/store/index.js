import Coox from '../../managment/coox-manager.js'

const cooxConsumer = new Coox({
    first: ({state, actions}) => {},
    state: {},
    methods: {},
    actions: {}
})

cooxConsumer.createCoox()

export default cooxConsumer