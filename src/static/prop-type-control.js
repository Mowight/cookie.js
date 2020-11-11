export const typesConsumer = () => {
    const types = {
        string: (req) => {
            return {type: "string", isRequire: req}
        },
        bool: (req) => {
            return {type: "boolean", isRequire: req}
        },
        number: (req) => {
            return {type: "number", isRequire: req}
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