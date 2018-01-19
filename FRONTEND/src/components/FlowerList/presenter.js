import React from 'react'
import styles from './styles.scss'
import Loading from 'components/Loading'
import _ from 'lodash'
import Ionicon from 'react-ionicons'


const FlowerList = props => {
    if(props.loading) {
        return <LoadingFlowers />
    } else if (props.searchedList) {
        return <RenderList {...props}/>
    }
}

const LoadingFlowers = props => <div className={styles.container}><Loading /></div>

const RenderList = props => (
    <div className={styles.container}>
    <div className={styles.wrapper}>
        <div className={styles.counter}><span className={styles.number}>10</span> Flowers for her, him, and you</div>
        <div className={styles.list}>
        {Object.keys(props.searchedList).length > 0 ? _.map(props.searchedList, (item, key) => {
            return (
                <li key={key}>
                    <div className={styles.item}>
                        <div className={styles.columnLeft}>
                            <img src={require(`images/flowers/${item.name}.png`)} alt={item.name}/>
                        </div>
                        <div className={styles.columnRight}>
                            <div className={styles.rowTop}>
                                <div className={styles.rowTopLeft}>
                                    <span className={styles.nameKr}>{item.name_kr}</span>
                                    <span className={styles.nameEn}>{capitalizeFirstLetter(item.name)}</span>
                                </div>
                                <div className={styles.rowTopRight}>
                                    {!props.currentSelectedFlowers.includes(item) 
                                        ? <Ionicon 
                                            icon="ios-add-circle" fontSize="25px" color="#635f5c"
                                            onClick={ () => props.selectFlower(item)}
                                        />
                                        :
                                        <div>
                                            <Ionicon 
                                                icon="ios-close-circle" fontSize="25px" color="#635f5c"
                                                onClick={ () => props.deselectFlower(item.id)}
                                            />
                                            <Ionicon
                                                icon="ios-add-circle" fontSize="25px" color="#635f5c"
                                                onClick={() => props.selectFlower(item)}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={styles.rowBottom}>
                                <span>"{item.flowerlanguage}"</span>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
        : <div> Nothing to be found :( </div>
        }</div>
        </div>
    </div>
)

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default FlowerList
