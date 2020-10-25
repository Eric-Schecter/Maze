import { Scene, Mesh, TextureLoader, MeshStandardMaterial, PlaneGeometry } from "three";

const texture = new TextureLoader().load('/textures/floor.jpg');

export const handleFloor = (scene: Scene) => {
  const geometry = new PlaneGeometry(21, 21);
  const material = new MeshStandardMaterial({ map: texture });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = - Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh
}