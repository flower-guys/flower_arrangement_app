import React, { Component } from "react";
import styles from "./styles.scss";
import Canvas from 'components/Canvas'

class App extends Component {
  render() {
    return (
    <div className={styles.App} >
      <Canvas />
    </div>
    )
  }
}

export default App;
