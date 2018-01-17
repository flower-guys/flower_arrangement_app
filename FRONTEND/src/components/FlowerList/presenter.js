import React from 'react'
import styles from './styles.scss'
import Loading from 'components/Loading'
import _ from 'lodash'

const FlowerList = props => {
    if(props.loading) {
        return <LoadingFlowers />
    } else if (props.fetchedFlowerList) {
        return <RenderList fetchedFlowerList={props.fetchedFlowerList}/>
    }
}

const LoadingFlowers = props => <div className={styles.list}><Loading /></div>

const RenderList = props => (
    <div className={styles.list}>{_.map(props.fetchedFlowerList, (image, key) => {
        return ( 
            <li
                className={styles.flower}
                key={key}
            >
                <span>{image.name}</span>
            </li>
        )
    })}</div>
)

export default FlowerList
