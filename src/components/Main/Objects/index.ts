import createMap from './createMap';
import { Block, rowNum, colNum } from '../../../shared';
import Wall from './wall';
import Ball from './ball';

export default class Maze {
  private data: Block[][];
  private _map: Array<Wall> = [];
  private _ball: Ball;
  constructor() {
    const pos = { x: -rowNum / 2, z: -colNum / 2 };
    this.data = createMap(rowNum, colNum);
    this.data.forEach(row => row.forEach(item => this.create(item)));
    this._ball = new Ball(pos);
  }
  public create = (d: Block) => {
    const { pos: { row, col }, north, east, south, west } = d;
    north && this._map.push(new Wall({ x: col, z: row - 0.5 }, 0));
    east && this._map.push(new Wall({ x: col + 0.5, z: row }, Math.PI / 2));
    south && this._map.push(new Wall({ x: col, z: row + 0.5 }, 0));
    west && this._map.push(new Wall({ x: col - 0.5, z: row }, Math.PI / 2));
  }
  public update = (radian:number) => {
    this._ball.update(this.data,radian);
  }
  public get map() {
    return this._map;
  }
  public get ball() {
    return this._ball;
  }
}
