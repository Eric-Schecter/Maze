export type Pos = {
  x: number,
  z: number,
}

export type Pos3D = {
  x: number,
  y: number,
  z: number,
}

export class Block {
  public north = true;
  public east = true;
  public south = true;
  public west = true;
  private _isVisited = false;
  constructor(private _pos: { row: number, col: number }) { }
  public get pos() {
    return this._pos;
  }
  public get isVisited() {
    return this._isVisited;
  }
  public set setIsVisited(res: boolean) {
    this._isVisited = res;
  }
}

export type Options =
  | 'north'
  | 'east'
  | 'south'
  | 'west'