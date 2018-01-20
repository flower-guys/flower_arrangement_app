import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.scss'

const Logo = props => {
    return (
        <header>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to='/' >LOGO PLACEHOLDER</Link>
                </div>
            </div>
            <div className={styles.right}>
            SEARCH WILL BE HERE
            </div>
        </header>
    )
}

export default Logo