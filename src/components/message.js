import { propTypesControl, typesConsumer } from '../static/prop-type-control.js'

export const Message = (props) => {
    const types = typesConsumer()

    propTypesControl(props).controls({
        name: types.string(true),
        message: types.string(true),
        emj: types.bool(false),
    })

    return (`
        <h1>
            ${props.name}: ${props.message} ${props.emj ? ':D' : ''}
        </h1>
    `)
}