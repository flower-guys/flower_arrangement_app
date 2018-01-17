import React, { Component } from "react"
import Navigation from 'components/Navigation'
// import FlowerArrangement from 'components/FlowerArrangement'
import FlowerList from 'components/FlowerList'
import Footer from 'components/Footer'
import styles from "./styles.scss"

class App extends Component {
  render() {
    return (
    <div className={styles.App} >
      <Navigation />
      <FlowerList />
      {/* <FlowerArrangement /> */}
      {/* <Footer /> */}
    </div>
    )
  }
}

export default App;
