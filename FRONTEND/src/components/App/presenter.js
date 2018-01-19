import React from "react"
import { Route, Switch } from 'react-router-dom'
import "./styles.scss"
import Navigation from 'components/Navigation'
import FlowerArrangement from 'components/FlowerArrangement'
import FlowerList from 'components/FlowerList'
import Footer from 'components/Footer'

const App = props => [
    <Navigation key={1} />,
    <Routes key={2} {...props} />,
    <Footer key={3} />
]
            
const Routes = props => (
    <Switch>
        <Route exact path='/' component={FlowerList} />
        <Route path='/arrange' component={FlowerArrangement} />
    </Switch>
)

export default App;
