import { propTypesControl, typesConsumer } from '../static/prop-type-control.js'

export const NavLink = (props) => {
    const types = typesConsumer()

    propTypesControl(props).controls({
        path: types.String(false, "/"),
        text: types.String(true)
    })

    return (`<a href="${props.path}"> ${props.text} </a>`)
}