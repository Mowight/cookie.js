import Alone from './alon-manager.js'

export default class Router {
    constructor(roots) {
        this.roots = roots
    }

    getPathName() {
        return window.location.pathname
    }

    createRouter() {
        const { roots, getPathName } = this

        for (let count in roots) {
            const path = roots[count].path
            const page = roots[count].page
            const pathName = getPathName()

            if (path === pathName) {
                new Alone(
                    document.getElementById("seed"),
                    page()
                ).createAlone()

                break;
            }
        }
    }
}