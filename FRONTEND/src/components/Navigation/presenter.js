import React, { Component } from 'react'
import _ from 'lodash'
import styles from './styles.scss'

const Navigation = props => {
    return (
        <header className={styles.header}>
            <SearchBar {...props} />
        </header>
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

    // componentDidMount() {
    //     window.addEventListener('click', event => {
    //         if (this.searchBar.contains(event.target)) {
    //             return
    //         }
    //         this.dropdownCloser()
    //    })
    // }
    componentWillUnmount() {
        window.removeEventListener('click', this.dropdownCloser)
        console.log(this.state.isDropdownOpen, 'unmount')
    }

    searchHandler (term) {
        this.props.searchFlower(term)
    }
    render() {
        const searchHandler = _.debounce(term => { this.searchHandler(term) }, 500)
        return (
            <div className={styles.searchBar} ref={node => this.searchBar = node} onClick={event => this.dropdownOpener()}>
                <input placeholder='Search' value={this.state.term} 
                    onChange={ event => {
                        this.setState({ term: event.target.value })
                        searchHandler(event.target.value)
                    }}
                />
                {this.props.fetchedFlowerList && this.state.isDropdownOpen === true &&
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
        _.map(props.fetchedFlowerList, (flower, key) => {
            return (
                <li
                    className={styles.searchItem}
                    key={key}
                    onClick={ () => props.selectFlower(flower)}
                >
                    <span>{flower.name}</span>
                </li>
            )
        })
    )
}


export default Navigation