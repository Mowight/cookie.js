export const addComponentFunctions = (functions) => {
    for (const prop in functions) {
        if (componentFunctions[prop] === undefined) {
            componentFunctions[prop] = functions[prop]
        }
    }
}