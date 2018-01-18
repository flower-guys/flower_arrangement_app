import React from "react"
import { Route, Switch } from 'react-router-dom'
import styles from "./styles.scss"
import Navigation from 'components/Navigation'
import FlowerArrangement from 'components/FlowerArrangement'
import FlowerList from 'components/FlowerList'
import Footer from 'components/Footer'

const App = props => [
    <Navigation key={1} />,
    <Routes key={2} />,
    <Footer key={3} />
]
            
const Routes = props => (
    <Switch>
        <Route exact path='/' component={FlowerList} />
        <Route exact path='/arrange' component={FlowerArrangement} />
    </Switch>
)

export default App;
