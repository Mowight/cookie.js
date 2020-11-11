import Alone from './alon-manager.js'
import alonex from '../src/store/index.js'

export default class Router {
    constructor(roots) {
        this.roots = roots
    }

    getPathName() {
        return window.location.pathname
    }

    createRouter(defaultPage) {
        const { roots, getPathName } = this
        let defaultCount = 0

        for (let count in roots) {
            const path = roots[count].path
            const page = roots[count].page
            const pathName = getPathName()

            if (path === pathName) {
                new Alone(
                    document.getElementById("seed"),
                    page(alonex)
                ).createAlone()

                break;
            } else {
                defaultCount++
            }
        }

        if (defaultCount >= roots.length) {
            new Alone(
                document.getElementById("seed"),
                defaultPage()
            ).createAlone()
        }
    }
}