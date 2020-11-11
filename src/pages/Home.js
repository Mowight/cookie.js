import { Message } from '../components/message.js'

export const Home = (coox) => {
    const message = Message({name: "User", message: "Hello", emj: true})

    return {
        html: (`
            <h1> Cookie.js App </h1>
            ${message.html}
        `),
        afterLoad() {
            console.log("Home page")
            message.afterLoad()
        }
    }
}
