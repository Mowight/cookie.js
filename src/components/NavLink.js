import { propTypesControl, typesConsumer, NUMBER } from '../static/prop-type-control.js'

export const NavLink = (props) => {
    const types = typesConsumer()

    propTypesControl(props).controls({
        path: types.String(true),
        text: types.String(false, [NUMBER])
    })

    return (`<a href="${props.path}"> ${props.text} </a>`)
}