import { Mesh, BoxGeometry, MeshStandardMaterial, TextureLoader } from "three";
import { Pos } from "../../shared";

const texture = new TextureLoader().load('/textures/wall.jpeg');
export default class Wall {
  protected _instance: Mesh;
  constructor(protected _pos: Pos, rotation: number) {
    const { x, z } = _pos;
    const geometry = new BoxGeometry(1, 1, 0.05);
    const material = new MeshStandardMaterial({ map: texture });
    this._instance = new Mesh(geometry, material);
    this._instance.position.set(x + 0.5, 0.5, z + 0.5);
    this._instance.rotation.y = rotation;
  }
  public get instance() {
    return this._instance;
  }
}