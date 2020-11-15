// new
import Router from './router-manager.js'
import Config from './config-manager.js'
import { Template } from '../src/Template.js'

class CookieCenter {
    constructor() {
        this.$ = {}
    }

    use(name, useItem) {
        this.$[name] = useItem
    }

    createRouter(router, defaultRequire) {
        new Router(router).createRouter(defaultRequire)
    }

    config(settings) {
        new Config(settings).configManager()
    }

    pageRender(root, node) {
        const { html, afterLoad } = node
        
        new Promise((resolve, reject) => {
            if (html !== undefined) {
                root.innerHTML = Template(html)
                resolve(true)
            } else {
                reject("html object not found please return html value as object in your pages")
            }
        }).then((res) => res ? (afterLoad !== undefined ? afterLoad() : null) : null)
        .catch(err => console.error(err))
    }
}

const Cookie = new CookieCenter()

export default Cookie
