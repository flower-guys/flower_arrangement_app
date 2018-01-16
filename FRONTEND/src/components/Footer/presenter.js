import React from 'react'
import styles from './styles.scss'

const Footer = props => {
    return (
        <footer className={styles.footer}>
            <span>꽃바구니</span>
            <span className={styles.flowerBasket}>{props.refinedList.map((image, key) => <span key={key}>{image.name} x {image.count} </span>)}</span>
        </footer>
    )
}

export default Footer