import Coox from '../../managment/coox-manager.js'

const cooxConsumer = new Coox({
    first: ({state, actions}) => {},
    state: {
        name: "Polat"
    },
    methods: {
        rename: (state, data) => {
            state.name = data.name
        }
    },
    actions: {
        TEST_ACTİON: () => {
            cooxConsumer.use("rename", {name: "Polat"})
            console.log(cooxConsumer.getHistory())
        }
    }
})

cooxConsumer.createCoox()
cooxConsumer.createHistory()

export default cooxConsumer