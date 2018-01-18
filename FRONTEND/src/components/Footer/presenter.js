import React from 'react'
import Ionicon from 'react-ionicons'
import styles from './styles.scss'

const Footer = props => {
    return (
        <footer className={styles.footer}>
            <div className={styles.rowTop}>
                <div className={styles.title}>
                    <Ionicon icon='ios-basket-outline' />
                    <span className={styles.titleCounter}>
                        <span className={styles.titleCount}>{props.currentSelectedFlowers.length}</span>
                        {' '}송이의 꽃이 담겼어요.
                    </span>
                </div>
                <div className={styles.minify}>
                <Ionicon icon='ios-arrow-down' />
                </div>
            </div>
            <div className={styles.flowerBasket}>
                {props.refinedList.map( (image, key) => {
                    return (
                        <div className={styles.selectedFlower} key={key}>
                            {`${image.name_kr}(${capitalizeFirstLetter(image.name)}) x`}&nbsp;
                            <span className={styles.selectedFlowerCount}>
                                {image.count}&nbsp;
                            </span>
                            <Ionicon className={styles.deselectFlower} icon='ios-remove-circle' fontSize='17px' color='#635f5c'
                                onClick={() => props.deselectFlower(image.id)} />
                        </div>
                    )
                })}
            </div>
            <div className={styles.rowBottom}>
                <div className={styles.forward}>
                    꽃 놓기
                    <Ionicon className={styles.fowardIcon} icon='ios-arrow-dropright-circle' color='#635f5c' />
                </div>
            </div>
        </footer>
    )
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default Footer