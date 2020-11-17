import Router from './router-manager.js'
import Config from './config-manager.js'
import { Template } from '../src/Template.js'

class Cookie {
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

    async pageRender(root, node) {
        const { html, afterLoad } = await node
        
        if (html !== undefined) {
            root.innerHTML = await Template(html)
            afterLoad !== undefined ? afterLoad() : null
        } else {
            console.error("html object not found please return html value as object in your pages")
        }
    }
}

const App = new Cookie()

export default App