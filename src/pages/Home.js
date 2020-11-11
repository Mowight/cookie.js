import { Logo } from '../components/logo.js'

export const Home = (coox) => {
    return {
        html: (`
            ${Logo()}
            <h1 class="title"> Cookie.js </h1>
            <hr />
            <div class="links">
                <a href="https://github.com/polat-poyraz"> I am GitHub Profile </a>
                <a href="https://github.com/polat-poyraz/cookie.js"> Cookie.js Repository </a>
                <a href="https://github.com/polat-poyraz/cookie.js"> Document </a>
                <a href="/about"> About </a>
            </div>
        `),
        afterLoad() {
            console.log("Home page")
        }
    }
}
