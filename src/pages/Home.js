import { Logo } from '../components/logo.js'
import { NavLink } from '../components/NavLink.js'
import { addComponentFunctions } from '../static/add-component-functions.js'

export const Home = (coox) => {
    addComponentFunctions({
        control: () => {
            coox.actions.TEST_ACTİON()
        }
    })

    return {
        html: (`
            ${Logo()}
            <h1 class="title"> Cookie.js </h1>
            <div class="links">
                ${NavLink({path: "https://github.com/polat-poyraz", text: "I am GitHub Profile"})}
                ${NavLink({path: "https://github.com/polat-poyraz/cookie.js", text: "Cookie.js Repository"})}
                ${NavLink({path: "https://github.com/polat-poyraz/cookie.js", text: "Document"})}
                ${NavLink({paths: "/about", text: "About"})}
            </div>
            <button onclick="$.control()">
                Click
            </button>
        `),
        afterLoad() {
            console.log("Home")
        }
    }
}