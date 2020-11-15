import { Home } from './pages/Home.js'
import { About } from './pages/About.js'
import Cookie from '../managment/cookie.js'

const cookieRoots = [
    {
        path: "/",
        page: Home
    },
    {
        path: "/about",
        page: About
    }
]

Cookie.createRouter(cookieRoots)