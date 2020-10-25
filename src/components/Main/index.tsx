import React, { useEffect, useRef } from "react";
import styles from './styles.module.scss';
import { Scene } from 'three';
import Maze from "../Objects";
import {
  handleResize, handleControls, handleLights, handleFloor,
  handleCamera, handleRenderer, handleObjects
} from "../setupWebGL";

type Props = {
  maze: Maze;
}

export default function Main({ maze }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) { return }
    const { offsetWidth, offsetHeight } = ref.current;
    const scene = new Scene();
    const camera = handleCamera(offsetWidth, offsetHeight, { x: 0, y: 30, z: 0 });
    const renderer = handleRenderer(ref.current, offsetWidth, offsetHeight);
    handleLights(scene);
    const controls = handleControls(camera, renderer);
    handleFloor(scene);
    handleObjects(scene, maze);
    handleResize(camera, renderer, offsetWidth, offsetHeight);

    let timer = 0;
    const animate = () => {
      renderer.render(scene, camera);
      maze.update(controls.getAzimuthalAngle());
      timer = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(timer);
  }, [ref, maze])

  return (
    <div
      ref={ref}
      className={styles.root}
    />
  );
}