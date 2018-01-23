import React from 'react'
import styles from './styles.scss'
import Ionicon from 'react-ionicons'

const Share = props => {
    return (
        <div className={styles.shareButtons}> 
            <Ionicon icon='md-download' className={styles.download} color='#635f5c' onClick={() => props.downloadDataURL('Fit_Flower')} />
            <Ionicon icon='logo-instagram' className={styles.instagram} color='#635f5c' />
            <Ionicon icon='logo-facebook' className={styles.facebook} color='#635f5c'/>
            <Ionicon icon='md-mail-open' className={styles.mail} color='#635f5c'/>
        </div>
    )
}

export default Share