export const About = (alonex) => {
    return {
        html: (`
            <h1> About </h1>
        `),
        afterLoad() {
            console.log("About page")
        }
    }
}