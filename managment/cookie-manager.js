export default class Cookie {
    constructor(root, node) {
        this.root = root
        this.node = node
    }

    createCookie() {
        const { root, node } = this
        const { html, afterLoad } = node

        new Promise((resolve, reject) => {
            if (html !== undefined) {
                root.innerHTML = html
                resolve(true)
            } else {
                reject("html not returned")
            }
        }).then((res) => res ? (afterLoad !== undefined ? afterLoad() : null) : null)
        .catch(err => console.error(err))
    }
}