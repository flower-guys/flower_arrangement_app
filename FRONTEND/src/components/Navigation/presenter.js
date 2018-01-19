import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import Ionicon from 'react-ionicons'
import styles from './styles.scss'

const Navigation = props => {
    return (
        <header className={styles.header}>
            <Logo />
            <SearchBar {...props} />
        </header>
    )
}
const Logo = props => {
    return (
        <div className={styles.logo}>
            <Link to='/' >LOGO PLACEHOLDER</Link>
        </div>
    )
}
class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            term: '',
            isDropdownOpen: false
        }
    }

    dropdownOpener = () => this.setState({ isDropdownOpen: true })
    dropdownCloser = () => this.setState({ isDropdownOpen: false })

    componentDidMount() {
        window.addEventListener('click', event => {
            if (this.searchBar.contains(event.target)) {
                return
            }
            this.dropdownCloser()
       })
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.dropdownCloser)
        console.log(this.state.isDropdownOpen, 'unmount')
    }

    render() {
        return (
            <div className={styles.searchBar} ref={node => this.searchBar = node} onClick={event => this.dropdownOpener()}>
                <input placeholder='Search' value={this.state.term} 
                    onChange={ event => {
                        this.setState({ term: event.target.value })
                        this.props._searchFlower(event.target.value)
                    }}
                />
                {this.props.searchedList && this.state.isDropdownOpen === true &&
                <div className={styles.searchList}>
                    <ul>
                        <DropdownList {...this.props} dropdownCloser={this.dropdownCloser} />
                    </ul>
                </div>
                }
            </div>
        )
    }
}

const DropdownList = props => {
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

export default Navigation