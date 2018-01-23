import React from 'react'
import { Link } from 'react-router-dom'
import Ionicon from 'react-ionicons'
import styles from './styles.scss'
import classNames from 'classnames'

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link className={styles.link} to='/' >
                        <Ionicon
                            icon='ios-flower-outline'
                            className={styles.closeSearch}
                            color='#635f5c'
                            fontSize='30px'
                            rotate={true}
                        /> 이 꽃이 당신과 잘 어울릴 것 같아서
                    </Link>
                </div>
            </div>
            <div className={props.needSearch ? classNames(styles.right, styles.rightSearch) : styles.right}>
                    {props.needSearch === true
                    ? <Ionicon 
                        icon='ios-play-outline'
                        className={styles.closeSearch}
                        color='#635f5c'
                        fontSize='25px'
                        onClick={() => props.handleClose()}/>
                    : <Ionicon
                        icon='ios-search'
                        className={styles.openSearch}
                        color='#635f5c'
                        fontSize='25px'
                        onClick={() => props.handleOpen()} />
                    }
            </div>
        </header>
    )
}

export default Header