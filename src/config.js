import Config from '../managment/config-manager.js'

const settings = {
    title: "Example Alone.js App",
    styles: [
        { rel: "stylesheet", fileName: "index.css" }
    ],
    links: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }
    ]
}

new Config(settings).configManager()