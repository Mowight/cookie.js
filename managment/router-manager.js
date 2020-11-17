import store from '../src/store/index.js'
import settings from '../src/config.js'
import App from './cookie.js'

export default class Router {
    constructor(roots) {
        this.roots = roots
    }

    getPathName() {
        return window.location.pathname
    }

    async createRouter(defaultPage) {
        await App.config(settings)

        const { roots, getPathName } = this
        let defaultCount = 0

        for (let count in roots) {
            const path = await roots[count].path
            const page = await roots[count].page
            const pathName = await getPathName()

            if (path === pathName) {
                const { state, actions } = await store

                await App.pageRender(
                    document.getElementById("seed"),
                    page({state, actions})
                )

                break;
            } else {
                defaultCount++
            }
        }

        if (defaultCount >= roots.length) {
            App.pageRender(
                document.getElementById("seed"),
                defaultPage()
            )
        }
    }
}