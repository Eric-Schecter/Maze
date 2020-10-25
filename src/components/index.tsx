import React from "react";
import styles from './styles.module.scss';
import Main from "./Main";
import Maze from "./Main/Objects";
const maze = new Maze();

export default function App() {
  return (
    <div className={styles.root}>
      <Main maze={maze} />
    </div>
  );
}
