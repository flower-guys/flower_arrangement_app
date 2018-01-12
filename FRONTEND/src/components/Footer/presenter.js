import React from 'react'
import styles from './styles.scss'

const Footer = props => {
    return (
        <footer className={styles.footer}>
            {props.refinedList 
                ? <span>꽃바구니: {props.refinedList.map(image => `${image.name} x ${image.count} `)}</span> 
                : <span>here is a Footer</span> 
            }          
        </footer>
    )
}

export default Footer