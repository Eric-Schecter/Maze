import React, { useEffect, useRef } from "react";
import styles from './styles.module.scss';
import { Scene } from 'three';
import Maze from "./Objects";
import {
  handleResize, handleControls, handleLights, handleFloor,
  handleCamera, handleRenderer, handleObjects
} from "./setupWebGL";
const maze = new Maze();

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) { return }
    const {innerWidth,innerHeight} = window;
    const scene = new Scene();
    const camera = handleCamera(innerWidth,innerHeight, { x: 0, y: 30, z: 0 });
    const renderer = handleRenderer(ref.current,innerWidth, innerHeight);
    handleLights(scene);
    const controls = handleControls(camera, renderer);
    handleFloor(scene);
    handleObjects(scene, maze);
    handleResize(camera, renderer, innerWidth, innerHeight);

    let timer = 0;
    const animate = () => {
      renderer.render(scene, camera);
      maze.update(controls.getAzimuthalAngle());
      timer = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(timer);
  }, [ref])

  return (
    <div
      ref={ref}
      className={styles.root}
    />
  );
}