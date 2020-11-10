import alonx from "../store/index.js"

export const Home = _ => {
    const { state } = alonx

    return {
        html: (`
            <h1> ${state.title} </h1>
        `),
        afterLoad() {
            console.log("Home")
        }
    }
}
