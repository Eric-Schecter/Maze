import { Scene } from "three";
import Maze from "../Objects";

export const handleObjects = (scene: Scene, maze: Maze) => {
  maze.map.forEach(obj => scene.add(obj.instance));
  scene.add(maze.ball.mesh);
}