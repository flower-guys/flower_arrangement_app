import React from 'react'
import Navigation from 'components/Navigation'
import Canvas from 'components/Canvas'
import Footer from 'components/Footer'
import styles from './styles.scss'

const FlowerArrangement = props => {
    return (
        <div className={styles.flowerArrangement}>
            <Navigation />
            <div className={styles.body}>
            <Canvas />
            </div>
            <Footer />
        </div>
    )
}

export default FlowerArrangement