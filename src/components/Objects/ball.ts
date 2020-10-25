import { Pos, Block, rowNum, colNum } from "../../shared";
import { SphereGeometry, MeshStandardMaterial, Mesh } from "three";
import { Vector } from "./vector";

export default class Ball {
  private _mesh: Mesh;
  private p: Vector;
  private v = new Vector(0, 0);
  private radius = 0.5;
  constructor(pos: Pos) {
    const { x, z } = pos;
    this.p = new Vector(x + this.radius, z + this.radius);
    const geometry = new SphereGeometry(this.radius * 4 / 5, 32, 32);
    const material = new MeshStandardMaterial();
    this._mesh = new Mesh(geometry, material);
    this._mesh.position.set(this.p.x, this.radius, this.p.y);
  }
  private judgeWallByPoint = (data: Block[][], x: number, y: number, xIndex: number, yIndex: number) => {
    const { west, north, south, east, pos: { row, col } } = data[yIndex][xIndex];
    const canMoveEast = east ? col + 1 - x > this.radius : true;
    const canMoveSouth = south ? row + 1 - y > this.radius : true;
    const canMoveWest = west ? x - col > this.radius : true;
    const canMoveNorth = north ? y - row > this.radius : true;
    return { canMoveEast, canMoveNorth, canMoveSouth, canMoveWest };
  }
  private judgeWall = (data: Block[][]) => {
    const { x, y } = this.p;
    const length = this.radius * 1 / 2;
    const xShift = Math.floor(rowNum / 2);
    const yShift = Math.floor(colNum / 2);
    const x1 = Math.floor(x - length + xShift);
    const y1 = Math.floor(y - length + yShift);
    const x2 = Math.floor(x + length + xShift);
    const y2 = Math.floor(y - length + yShift);
    const x3 = Math.floor(x - length + xShift);
    const y3 = Math.floor(y + length + yShift);
    const x4 = Math.floor(x + length + xShift);
    const y4 = Math.floor(y + length + yShift);
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
  private updateV = (data: Block[][], radian: number) => {
    const { canMoveEast, canMoveNorth, canMoveSouth, canMoveWest } = this.judgeWall(data);
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
  public update = (data: Block[][], radian: number) => {
    this.updateV(data, radian);
    this.p.add(this.v);
    this._mesh.position.set(this.p.x, 0.5, this.p.y);
  }
  public get mesh() {
    return this._mesh;
  }
}
