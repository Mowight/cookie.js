import Coox from '../../managment/coox-manager.js'

const cooxConsumer = new Coox({
    firstEmployee: {},
    lastEmployee: {},
    state: {
        title: "Cookie.js"
    },
    methods: {},
    actions: {}
})

cooxConsumer.createCoox()

export default cooxConsumer