import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.scss'
import classNames from 'classnames'

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to='/' >LOGO PLACEHOLDER</Link>
                </div>
            </div>
            <div className={props.needSearch ? classNames(styles.right, styles.rightSearch) : styles.right}>
                    {props.needSearch === true
                        ? <button className={styles.closeSearch} onClick={() => props.handleClose()}>CLOSE</button>
                        : <button className={styles.openSearch} onClick={() => props.handleOpen()}>SEARCH BUTTON</button>
                    }
            </div>
        </header>
    )
}

export default Header