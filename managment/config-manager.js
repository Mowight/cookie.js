export default class Config {
    constructor(settings) {
        this.settings = settings
    }

    $title(title) {
        if (title !== undefined) {
            document.head.innerHTML += (`<title> ${title} </title>`)
        } else {
            document.head.innerHTML += (`<title> Alone App </title>`)
        }
    }

    $links(links) {
        for (let i in links) {
            const rel = links[i].rel
            const href = links[i].href
            document.head.innerHTML += (`<link rel="${rel}" href="${href}" />`)
        }
    }

    $styles(styles) {
        for (let i in styles) {
            const rel = styles[i].rel
            const fileName = styles[i].fileName
            document.head.innerHTML += (`<link rel="${rel}" href="../src/styles/${fileName}" />`)
        }
    }

    configManager() {
        const { settings } = this

        this.$title(settings.title)
        this.$styles(settings.styles)
        this.$links(settings.links)
    }
}