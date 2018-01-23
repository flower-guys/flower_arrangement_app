import React from 'react'
import Canvas from 'components/Canvas'
import Card from 'components/Card'
import styles from './styles.scss'

const FlowerArrangement = props => {

    return (
        <div className={styles.container}>
            <Canvas className={styles.canvas} />
            <Card />
        </div>
    )
}

export default FlowerArrangement