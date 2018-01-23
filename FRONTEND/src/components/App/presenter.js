import React from "react"
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames'
import styles from './styles.scss'
import Header from 'components/Header'
import FlowerArrangement from 'components/FlowerArrangement'
import FlowerList from 'components/FlowerList'
import Footer from 'components/Footer'
import Search from 'components/Search'
import Card from 'components/Card'

const App = props => (      
        <div className={props.needSearch ? classNames(styles.container, styles.containerSearch) : styles.container}>
            <div className={styles.main}>
                <Header />
                <article>
                    <Routes />
                </article>
                <Footer />
            </div>
            <div className={styles.side}>
                <Search />
            </div>
            <div className={styles.mask} onClick={() => props.closeSearch()}/>
        </div>          
)
            
const Routes = props => (
    <Switch>
        <Route exact path='/' component={FlowerList} />
        <Route path='/arrange' component={FlowerArrangement} />
        <Route path='/card' component={Card} />
    </Switch>
)

export default App;
