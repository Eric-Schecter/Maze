import { Pos, Block, rowNum, colNum } from "../../../shared";
import { SphereGeometry, MeshStandardMaterial, Mesh } from "three";
import { Vector } from "./vector";

export default class Ball {
  private _mesh: Mesh;
  private p: Vector;
  private v = new Vector(0, 0);
  private radius = 0.5;
  constructor(pos: Pos, private data: Block[][]) {
    const { x, z } = pos;
    this.p = new Vector(x + this.radius, z + this.radius);
    const geometry = new SphereGeometry(this.radius * 4 / 5, 32, 32);
    const material = new MeshStandardMaterial();
    this._mesh = new Mesh(geometry, material);
    this._mesh.position.set(this.p.x, this.radius, this.p.y);
  }
  private judgeWallByPoint = (data: Block[][], x: number, y: number, xIndex: number, yIndex: number) => {
    const { west, north, south, east, pos: { x: xBlock, z: zBlock } } = data[xIndex][yIndex];
    const canMoveEast = east ? xBlock + 1 - x > this.radius : true;
    const canMoveSouth = south ? zBlock + 1 - y > this.radius : true;
    const canMoveWest = west ? x - xBlock > this.radius : true;
    const canMoveNorth = north ? y - zBlock > this.radius : true;
    return { canMoveEast, canMoveNorth, canMoveSouth, canMoveWest };
  }
  private pos2Index = (pos: Pos) => {
    const { x, z } = pos;
    return {
      xIndex: Math.floor(z + rowNum / 2),
      yIndex: Math.floor(x + colNum / 2),
    }
  }
  private judgeWall = (data: Block[][]) => {
    const { x, y } = this.p;
    const length = this.radius / 2;
    const { xIndex: x1, yIndex: y1 } = this.pos2Index({ x: x - length, z: y - length });
    const { xIndex: x2, yIndex: y2 } = this.pos2Index({ x: x + length, z: y - length });
    const { xIndex: x3, yIndex: y3 } = this.pos2Index({ x: x - length, z: y + length });
    const { xIndex: x4, yIndex: y4 } = this.pos2Index({ x: x + length, z: y + length });
    const p1 = this.judgeWallByPoint(data, x, y, x1, y1);
    const p2 = this.judgeWallByPoint(data, x, y, x2, y2);
    const p3 = this.judgeWallByPoint(data, x, y, x3, y3);
    const p4 = this.judgeWallByPoint(data, x, y, x4, y4);
    const canMoveEast = p1.canMoveEast && p2.canMoveEast && p3.canMoveEast && p4.canMoveEast;
    const canMoveNorth = p1.canMoveNorth && p2.canMoveNorth && p3.canMoveNorth && p4.canMoveNorth;
    const canMoveSouth = p1.canMoveSouth && p2.canMoveSouth && p3.canMoveSouth && p4.canMoveSouth;
    const canMoveWest = p1.canMoveWest && p2.canMoveWest && p3.canMoveWest && p4.canMoveWest;
    return { canMoveEast, canMoveNorth, canMoveSouth, canMoveWest };
  }
  private updateV = (radian: number) => {
    const { canMoveEast, canMoveNorth, canMoveSouth, canMoveWest } = this.judgeWall(this.data);
    const maxValue = 0.1;
    const vy = Math.cos(radian) * maxValue;
    const vx = Math.sin(radian) * maxValue;
    const vyFinal = vy > 0
      ? canMoveSouth
        ? vy
        : 0
      : canMoveNorth
        ? vy
        : 0
    const vxFinal = vx < 0
      ? canMoveWest
        ? vx
        : 0
      : canMoveEast
        ? vx
        : 0
    this.v = new Vector(vxFinal, vyFinal)
  }
  public update = (radian: number) => {
    this.updateV(radian);
    this.p.add(this.v);
    this._mesh.position.set(this.p.x, 0.5, this.p.y);
  }
  public get mesh() {
    return this._mesh;
  }
}
