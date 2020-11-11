import { Message } from '../components/message.js'

export const Home = (alonex) => {
    return {
        html: (`
            <h1> Alon.js App </h1>
            ${Message({name: "Polat", message: "Hello", emj: true})}
        `),
        afterLoad() {
            // console.log("Home page")
        }
    }
}
