import React from 'react'
import { connect } from "react-redux";
import { actionCreators as layoutActions } from 'redux/modules/layout'
import { actionCreators as messageActions } from 'redux/modules/message'
import styles from './styles.scss'

const Card = props => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>글 담기</div>
            <div className={styles.menu}>
                <div className={styles.bigger} onClick={ () => props.fontSize(1)}>크게</div>
                <div className={styles.smaller} onClick={() => props.fontSize(-1)}>작게</div>
                <div className={styles.bold} onClick={() => props.fontStyle('bold')}>굵게</div>
                <div className={styles.light} onClick={() => props.fontStyle('normal')}>얇게</div>
            </div>
            <div className={styles.message}>
                <textarea 
                    name="message"
                    cols="40" rows="8"
                    onChange={ event => {
                        props.inputMessage(event.target.value)
                        console.log(props.messageInput)
                    }}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { message, layout, routing: { location } } = state
    return {
        pathname: location.pathname,
        needSearch: layout.needSearch,
        messageInput: message.messageInput,
        fontSize: message.fontSize,
        fontStyle: message.fontStyle
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openSearch: () => {
            dispatch(layoutActions.openSearch())
        },
        closeSearch: () => {
            dispatch(layoutActions.closeSearch())
        },
        inputMessage: inputValue => {
            dispatch(messageActions.inputMessage(inputValue))
        },
        fontSize: size => {
            dispatch(messageActions.fontSize(size))
        },
        fontStyle: style => {
            dispatch(messageActions.fontStyle(style))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)

