export const typesConsumer = () => {
    const types = {
        String: (req, defaultValue, extraTypes) => {
            return {type: "string", isRequire: req, default: defaultValue, extraTypes}
        },
        Bool: (req, defaultValue, extraTypes) => {
            return {type: "boolean", isRequire: req, default: defaultValue, extraTypes}
        },
        Number: (req, defaultValue, extraTypes) => {
            return {type: "number", isRequire: req, default: defaultValue, extraTypes}
        },
        Object: (req, defaultValue, extraTypes) => {
            return {type: "object", isRequire: req, default: defaultValue, extraTypes}
        },
        Function: (req, defaultValue, extraTypes) => {
            return {type: "function", isRequire: req, default: defaultValue, extraTypes}
        },
        Symbol: (req, defaultValue, extraTypes) => {
            return {type: "symbol", isRequire: req, default: defaultValue, extraTypes}
        }
    }

    return types
}

const STRİNG = "string"
const NUMBER = "number"
const OBJECT = "object"
const FUNCTION = "function"
const SYMBOL = "symbol"

export {STRİNG, NUMBER, OBJECT, FUNCTION, SYMBOL}

export const propTypesControl = (props) => {
    const controls = (controls) => {
        for (const prop in controls) {
            if (props[prop] !== undefined) {
                const getType = typeof props[prop]
                const reqType = controls[prop].type
                const extraTypes = controls[prop].extraTypes

                if (getType !== reqType) {
                    if (extraTypes !== undefined) {
                        let defaultCount = 0

                        for (let i in extraTypes) {
                            if (getType !== extraTypes[i]) {
                                defaultCount++
                            }
                        }

                        if (defaultCount === extraTypes.length) {
                            console.warn(`desired type "${reqType}", but incoming type "${getType}" \n none of these types: ${extraTypes.join(", ")}.`)
                        }
                    }
                }
            } else {
                if (controls[prop].isRequire) {
                    console.error(`"${prop}" who was supposed to come did not come`)
                }

                if (controls[prop].default !== undefined) {
                    props[prop] = controls[prop].default
                }
            }
        }
    }

    return {controls}
}