export const typesConsumer = () => {
    const types = {
        String: (req, defaultValue) => {
            return {type: "string", isRequire: req, default: defaultValue}
        },
        Bool: (req, defaultValue) => {
            return {type: "boolean", isRequire: req, default: defaultValue}
        },
        Number: (req, defaultValue) => {
            return {type: "number", isRequire: req, default: defaultValue}
        },
        Object: (req, defaultValue) => {
            return {type: "object", isRequire: req, default: defaultValue}
        },
        Function: (req, defaultValue) => {
            return {type: "function", isRequire: req, default: defaultValue}
        },
        Symbol: (req, defaultValue) => {
            return {type: "symbol", isRequire: req, default: defaultValue}
        }
    }

    return types
}

export const propTypesControl = (props) => {
    const controls = (controls) => {
        for (const prop in controls) {

            if (props[prop] !== undefined) {
                const getType = typeof props[prop]
                const reqType = controls[prop].type

                if (getType !== reqType) {
                    console.warn(`desired type "${reqType}", but incoming type "${getType}"`)
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