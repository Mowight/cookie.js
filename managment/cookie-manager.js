import { Template } from '../src/Template.js'

export default class Cookie {
    use(useItem) {
        this.content
    }

    render(root, node) {
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