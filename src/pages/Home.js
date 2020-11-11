import { addEvent } from '../tools/tools.js'

export const Home = (alonex) => {
    return {
        html: (`
            <h1> Alon.js App </h1>
        `),
        afterLoad() {
            console.log("Home page")
        }
    }
}
