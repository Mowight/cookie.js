import Router from '../managment/router-manager.js'
import { Home } from './pages/Home.js'

const roots = [
    {
        path: "/",
        page: Home
    }
]

new Router(roots).createRouter()