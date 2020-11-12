export const typesConsumer = () => {
    const types = {
        String: (req) => {
            return {type: "string", isRequire: req}
        },
        Bool: (req) => {
            return {type: "boolean", isRequire: req}
        },
        Number: (req) => {
            return {type: "number", isRequire: req}
        },
        Object: (req) => {
            return {type: "object", isRequire: req}
        },
        Function: (req) => {
            return {type: "function", isRequire: req}
        },
        Symbol: (req) => {
            return {type: "symbol", isRequire: req}
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
            }
        }
    }

    return {controls}
}