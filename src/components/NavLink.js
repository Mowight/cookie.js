import { propTypesControl, typesConsumer, STRİNG, NUMBER } from '../static/prop-type-control.js'
import { addComponentFunctions } from '../static/add-component-functions.js'

export const NavLink = (props) => {
    const types = typesConsumer()

    addComponentFunctions({
        test: () => {
            alert()
        }
    })

    propTypesControl(props).controls({
        path: types.String(false, "/", [STRİNG, NUMBER]),
        text: types.String(true)
    })

    return (`<a href="${props.path}"> ${props.text} </a>`)
}