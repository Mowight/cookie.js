import { Message } from '../components/message.js'
import { setCss } from '../static/tools.js'

export const Home = (alonex) => {
    const message = Message({name: "User", message: "Hello", emj: true})

    return {
        html: (`
            <h1> Alon.js App </h1>
            ${message.html}
        `),
        afterLoad() {
            console.log("Home page")
            message.afterLoad()
        }
    }
}
