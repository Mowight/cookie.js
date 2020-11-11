export const About = (coox) => {
    return {
        html: (`
            <h1> About </h1>
        `),
        afterLoad() {
            console.log("About page")
        }
    }
}