import createMap from './createMap';
import { Block, rowNum, colNum } from '../../../shared';
import Wall from './wall';
import Ball from './ball';

export default class Maze {
  private _map: Array<Wall> = [];
  private _ball: Ball;
  constructor() {
    const pos = { x: -rowNum / 2, z: -colNum / 2 };
    const data = createMap(rowNum, colNum);
    data.forEach(row => row.forEach(item => this.create(item)));
    this._ball = new Ball(pos, data);
  }
  public create = (d: Block) => {
    const { pos: { x, z }, north, east, south, west } = d;
    north && this._map.push(new Wall({ x, z: z - 0.5 }, 0));
    east && this._map.push(new Wall({ x: x + 0.5, z }, Math.PI / 2));
    south && this._map.push(new Wall({ x, z: z + 0.5 }, 0));
    west && this._map.push(new Wall({ x: x - 0.5, z }, Math.PI / 2));
  }
  public update = (radian: number) => {
    this._ball.update(radian);
  }
  public get map() {
    return this._map;
  }
  public get ball() {
    return this._ball;
  }
}
