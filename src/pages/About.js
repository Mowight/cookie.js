export const About = (alonex) => {
    const { state } = alonex

    return {
        html: (`
            <h1> ${state.title} </h1>
            <h3> page: About </h3>
        `),
        afterLoad() {
            console.log(state)
        }
    }
}