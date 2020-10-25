import { PerspectiveCamera, Renderer } from "three";

export const handleResize = (camera: PerspectiveCamera, renderer: Renderer, width: number, height: number) => {
  const resize = () => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', resize);
}