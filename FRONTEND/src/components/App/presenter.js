import React from "react"
import { Route, Switch } from 'react-router-dom'
import styles from './styles.scss'
import Header from 'components/Header'
import FlowerArrangement from 'components/FlowerArrangement'
import FlowerList from 'components/FlowerList'
import Footer from 'components/Footer'
import Search from 'components/Search'

const App = props => (
    <div className={styles.container}>
        <div className={styles.main}>
            <Header />
            <Routes />
            <Footer />
        </div>
        <div className={styles.side}>
            {/* <Search /> */}
        </div>
    </div>
)

            
const Routes = props => (
    <Switch>
        <Route exact path='/' component={FlowerList} />
        <Route path='/arrange' component={FlowerArrangement} />
    </Switch>
)

export default App;
