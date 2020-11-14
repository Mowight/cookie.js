import Cookie from './cookie-manager.js'
import cooxConsumer from '../src/store/index.js'

export default class Router {
    constructor(roots) {
        this.roots = roots
    }

    getPathName() {
        return window.location.pathname
    }

    createRouter(defaultPage) {
        const CookieConsumer = new Cookie()

        const { roots, getPathName } = this
        let defaultCount = 0

        for (let count in roots) {
            const path = roots[count].path
            const page = roots[count].page
            const pathName = getPathName()

            if (path === pathName) {
                const { state, actions } = cooxConsumer

                CookieConsumer.render(
                    document.getElementById("seed"),
                    page({state, actions})
                )

                break;
            } else {
                defaultCount++
            }
        }

        if (defaultCount >= roots.length) {
            CookieConsumer.render(
                document.getElementById("seed"),
                defaultPage()
            )
        }
    }
}