import React from "react"
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames'
import styles from './styles.scss'
import Header from 'components/Header'
import FlowerArrangement from 'components/FlowerArrangement'
import FlowerList from 'components/FlowerList'
import Footer from 'components/Footer'
import Search from 'components/Search'
import Share from 'components/Share'

const App = props => (      
        <div className={props.needSearch ? classNames(styles.container, styles.containerSearch) : styles.container}>
            <div className={styles.main}>
                <Header />
                <article>
                    <Routes />
                </article>
                <FooterRoutes />
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
        <Route path='/share' component={Share} />
    </Switch>
)

const FooterRoutes = props => (
    <Switch>
        <Route exact path='/' component={Footer} />
        <Route path='/arrange' component={Footer} />
        <Route exact path='/share' render={null} />
    </Switch>
)

export default App;
