import React, { Component } from 'react'
import _ from 'lodash'
import Ionicon from 'react-ionicons'
import styles from './styles.scss'

const Search = props => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <SearchBar {...props} />
            </header>
            <SearchList {...props}/>
        </div>
    )
}

const SearchBar = props => {
        return (
            <div className={styles.searchBar} ref={node => this.searchBar = node} >
                <input placeholder='Search' value={props.term} 
                    onChange={ event => {
                        props.handleInput(event.target.value)
                        props._searchFlower(event.target.value)
                    }}
                />
            </div>
        )
}

const SearchList = props => {
    return (
        _.map(props.searchedList, (flower, key) => {
            return (
                <li key={key} onClick={ () => props.selectFlower(flower)}>
                    <div className={styles.searchItem}>
                        {flower.name_kr}({capitalizeFirstLetter(flower.name)})
                        <Ionicon icon='ios-add-circle' fontSize='15px' color='#635f5c'/>
                    </div>
                </li>
            )
        })
    )
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Search