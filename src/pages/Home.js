export const Home = (alonex) => {
    const { state } = alonex

    return {
        html: (`
            <h1> ${state.title} </h1>
        `),
        afterLoad() {
            console.log("Home")
        }
    }
}
