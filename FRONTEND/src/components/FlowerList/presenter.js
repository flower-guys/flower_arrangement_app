import React from 'react'
import styles from './styles.scss'
import Loading from 'components/Loading'
import _ from 'lodash'
import addButton from 'images/add.png'
import addButtonHover from 'images/addHover.png'
import removeButton from 'images/remove.png'
import removeButtonHover from 'images/removeHover.png'
import HoverImage from 'react-hover-image'


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
            <div className={styles.counter}><span className={styles.number}>{Object.keys(props.fetchedFlowerList).length}</span> Flowers for you</div>
        <div className={styles.list}>
        {Object.keys(props.searchedList).length > 0 
        ? _.map(props.searchedList, (item, key) => {
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
                                {!props.currentSelectedFlowers.includes(item) 
                                ? <div className={styles.rowTopRight}>
                                    <div className={styles.addButton}
                                        onClick={() => props.selectFlower(item)}
                                    >
                                        <HoverImage src={addButton} hoverSrc={addButtonHover} />
                                    </div>
                                </div>
                                : <div className={styles.rowTopRight}>
                                    <div className={styles.removeButton}
                                        onClick={ () => props.deselectFlower(item.id)}
                                    >
                                        <HoverImage src={removeButton} hoverSrc={removeButtonHover} />
                                    </div>
                                    <div className={styles.addButton}
                                        onClick={ () => props.selectFlower(item)}
                                    >
                                        <HoverImage src={addButton} hoverSrc={addButtonHover} />
                                    </div>
                                </div>}
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
