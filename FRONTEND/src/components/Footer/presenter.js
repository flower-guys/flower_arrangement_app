import React from 'react'
import Ionicon from 'react-ionicons'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import styles from './styles.scss'

const Footer = props => {
    return (
        <footer 
            className={props.currentSelectedFlowers.length > 0
                ? props.isMinified === false 
                    ? classNames(styles.footer, styles.footerActive)
                    : classNames(styles.footer, styles.footerMinified) 
                : styles.footer
            }
        >
            <div className={styles.rowTop}>
                <div className={styles.title}>
                    <Ionicon icon='ios-basket-outline' />
                    <span className={styles.titleCounter}>
                        <span className={styles.titleCount}>{props.currentSelectedFlowers.length}</span>
                        {' '}송이의 꽃이 담겼어요.
                    </span>
                </div>
                <div className={styles.upDownButton}>
                {props.isMinified === true
                    ? <Ionicon icon='ios-arrow-up' onClick={ () => props.handleMaximize()} />
                    : <Ionicon icon='ios-arrow-down' onClick={ () => props.handleMinify() } />
                }
                </div>
            </div>
            <div className={styles.flowerBasket}>
                {props.exportingList.map( (image, key) => {
                    return (
                        <div className={styles.selectedFlower} key={key}>
                            {`${image.name_kr}(${capitalizeFirstLetter(image.name)}) x`}&nbsp;
                            <span className={styles.selectedFlowerCount}>
                                {image.count}&nbsp;
                            </span>
                            {props.pathname === '/' &&
                            <Ionicon className={styles.deselectFlower} icon='ios-remove-circle' fontSize='17px' color='#635f5c'
                                onClick={() => props.deselectFlower(image.id)} />
                            }
                        </div>
                    )
                })}
            </div>
            <div className={styles.rowBottom}>
                <div className={styles.bottomLeft}>
                    {props.pathname !== '/' && 
                    <Link className={styles.forward} to='/'>
                        뒤로가기
                        <Ionicon className={styles.fowardIcon} icon='ios-arrow-dropleft-circle' color='#635f5c' />
                    </Link>}
                </div>
                <div className={styles.bottomRight}>
                    {props.pathname !== '/arrange' && 
                    <Link className={styles.forward} to='/arrange'>
                        꽃 놓기
                        <Ionicon className={styles.fowardIcon} icon='ios-arrow-dropright-circle' color='#635f5c' />
                    </Link>}
                </div>
            </div>
        </footer>
    )
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default Footer