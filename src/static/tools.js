export const setHtml = (id, newContent) => {
    document
    .querySelector(id)
    .innerHTML = typeof newContent === "function" ? newContent() : newContent
}

export const addHtml = (id, newContent) => {
    document
    .querySelector(id)
    .innerHTML += typeof newContent === "function" ? newContent() : newContent
}

export const setCss = (id, css) => {
    const el = document.querySelector(id)

    for (const prop in css) {
        if (el.style[prop] !== undefined) {
            el.style[prop] = css[prop]
        } else {
            console.error(`No CSS keys worth ${prop}`)
        }
    }
}

export const addEvent = (id, eventName, eventContent) => {
    document.querySelector(id).addEventListener(eventName, eventContent)
}

export const get = (select) => {
    return document.querySelector(select)
}

export const getAll = (select) => {
    return document.querySelectorAll(select)
}

export const removeEl = (select) => {
    document.querySelector(select).remove()
}