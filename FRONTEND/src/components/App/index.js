import React, { Component } from "react";
import styles from "./styles.scss";
import Asdf from '../asdf'

class App extends Component {
  render() {
    return (
    <div className={styles.App} >
      <Asdf />
    </div>
    )
  }
}

export default App;
