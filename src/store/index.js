import Coox from '../../managment/coox-manager.js'

const cooxConsumer = new Coox({
    firstEmployee: {},
    lastEmployee: {
        addUsers() {
            fetch("https://jsonplaceholder.typicode.com/posts/1")
                .then(res => res.json())
                .then(data => console.log(data))
        }
    },
    state: {
        title: "Cookie.js"
    },
    methods: {},
    actions: {}
})

cooxConsumer.createCoox()

export default cooxConsumer