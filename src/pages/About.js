import { Logo } from '../components/logo.js'
import { NavLink } from '../components/NavLink.js'

export const About = (coox) => {
    return {
        html: (`
            ${Logo()}
            <h2>
                Cookie.js is a library for you to write the front of your web pages using vanilla <br>
                javascript. On the basis of Cookie.js, it is a library that offers an understandable <br> structure with very 
                simple codes. ${NavLink({path: "/", text: "Back"})}
            </h2>
        `),
        afterLoad() {
            console.log("About page")
        }
    }
}