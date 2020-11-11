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

export const addEvent = (id, eventName, eventContent) => {
    document.querySelector(id).addEventListener(eventName, eventContent)
}