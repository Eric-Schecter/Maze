import { Block, Options } from "../../../shared";

const createMap = (rowNum:number,colNum:number) => {
  const randomDirection = () => {
    const options: Array<Options> = ['north', 'east', 'south', 'west'];
    for (let i = 0; i < options.length; i++) {
      const randomNum = Math.floor(Math.random() * options.length);
      const temp = options[i];
      options[i] = options[randomNum];
      options[randomNum] = temp;
    }
    return options;
  };
  const map: Block[][] = new Array(rowNum)
    .fill(0)
    .map((row, rowID) =>
      new Array(colNum)
        .fill(0)
        .map((col, colID) =>
          new Block({ x: colID - Math.floor(colNum / 2), z: rowID - Math.floor(rowNum / 2) })));

  const getNextPos = (row: number, col: number, dir: Options) => {
    switch (dir) {
      case 'east': return { row, col: col + 1 };
      case 'west': return { row, col: col - 1 };
      case 'north': return { row: row - 1, col };
      case 'south': return { row: row + 1, col };
    }
  }

  const isOutsideBorder = (dir: Options, row: number, col: number) => {
    return (dir === 'west' && col <= 0)
      || (dir === 'east' && col >= colNum - 1)
      || (dir === 'north' && row <= 0)
      || (dir === 'south' && row >= rowNum - 1)
  }

  const getOppositeDir = (dir: Options): Options => {
    if (dir === 'east') { return 'west' }
    if (dir === 'west') { return 'east' }
    if (dir === 'south') { return 'north' }
    return 'south';
  }

  const generateMap = (data: Block[][], pos: { row: number, col: number }) => {
    const { row, col } = pos;
    data[row][col].setIsVisited = true;
    const direction = randomDirection();
    for (let i = 0; i < direction.length; i++) {
      const dir = direction[i];
      if (isOutsideBorder(dir, row, col)) { continue }
      if (!data[row][col][dir]) { continue }
      const nextPos = getNextPos(row, col, dir);
      if (data[nextPos.row][nextPos.col].isVisited) { continue }
      data[row][col][dir] = false;
      data[nextPos.row][nextPos.col][getOppositeDir(dir)] = false;
      generateMap(data, nextPos);
    }
  }
  generateMap(map, { row: 0, col: 0 });
  return map;
}

export default createMap;

