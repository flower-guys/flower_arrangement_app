
const INPUT_MESSAGE = 'INPUT_MESSAGE'
const FONT_SIZE = 'FONT_SIZE'
const FONT_STYLE = 'FONT_STYLE'

function inputMessage(inputValue) {
    return {
        type: INPUT_MESSAGE,
        inputValue
    }
}
function fontSize(size) {
    return {
        type: FONT_SIZE,
        size
    }
}
function fontStyle(style) {
    return {
        type: FONT_STYLE,
        style
    }
}

const initialState = {
    messageInput: '',
    fontSize: 14,
    fontStyle: 'normal'
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case INPUT_MESSAGE:
            return applyInputMessage(state, action)
        case FONT_SIZE:
            return applyFontSize(state, action)
        case FONT_STYLE:
            return applyFontStyle(state, action)
        default:
            return state
    }
}

function applyInputMessage(state, action) {
    const { inputValue } = action
    return {
        ...state,
        messageInput: inputValue
    }
}
function applyFontSize(state, action) {
    const { size } = action
    return {
        ...state,
        fontSize: state.fontSize + size
    }
}
function applyFontStyle(state, action) {
    const { style } = action
    return {
        ...state,
        fontStyle: style
    }
}

const actionCreators = {
    inputMessage,
    fontSize,
    fontStyle
}

export { actionCreators }
export default reducer