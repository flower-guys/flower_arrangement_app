import React, { Component } from "react";
import styles from "./styles.scss";
import FlowerArrangement from 'components/FlowerArrangement'

class App extends Component {
  render() {
    return (
    <div className={styles.App} >
      <FlowerArrangement />
    </div>
    )
  }
}

export default App;
