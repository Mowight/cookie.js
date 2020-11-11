import { Logo } from '../components/logo.js'
import { NavLink } from '../components/NavLink.js'

export const Home = (coox) => {
    return {
        html: (`
            ${Logo()}
            <h1 class="title"> Cookie.js </h1>
            <hr />
            <div class="links">
                ${NavLink({path: "https://github.com/polat-poyraz", text: "I am GitHub Profile"})}
                ${NavLink({path: "https://github.com/polat-poyraz/cookie.js", text: "Cookie.js Repository"})}
                ${NavLink({path: "https://github.com/polat-poyraz/cookie.js", text: "Document"})}
                ${NavLink({path: "/about", text: "About"})}
            </div>
        `),
        afterLoad() {
            console.log("Home page")
        }
    }
}
