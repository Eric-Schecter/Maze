export class Vector {
  constructor(public x: number, public y: number) { }
  public add = (v: Vector) => {
    this.x += v.x;
    this.y += v.y;
  }
}