import React from 'react'
import styles from './styles.scss'

const Share = props => {
    return (
        <div className={styles.shareButtons}> 
            <button onClick={() => props.downloadDataURL('Fit_Flower')}>그림 저장</button>
            <button>카카오스토리</button>
            <button>Facebook</button>
            <button>Mail</button>
        </div>
    )
}

export default Share