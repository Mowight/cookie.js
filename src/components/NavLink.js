import { propTypesControl, typesConsumer, NUMBER } from '../static/prop-type-control.js'
import { addComponentFunctions } from '../static/add-component-functions.js'

export const NavLink = (props) => {
    const types = typesConsumer()

    addComponentFunctions({
        test: () => {
            alert()
        }
    })

    propTypesControl(props).controls({
        path: types.String(true),
        text: types.String(false, [NUMBER])
    })

    return (`<a href="${props.path}"> ${props.text} </a>`)
}