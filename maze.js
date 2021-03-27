class Maze {
  constructor(Size, CanvasSize) {
    this.Size = Size;
    this.BoxSize = CanvasSize / this.Size;
    this.Grid = [];
    this.Players = [];
  }
  getPossiableMovements() {
    var x = this.CurPlayer.Location.X;
    var y = this.CurPlayer.Location.Y;
    var possiableMovements = [];
    var currenCell = this.Grid[this.index(x, y)];
    var Top = this.Grid[this.index(x, y - 1)];
    var Right = this.Grid[this.index(x + 1, y)];
    var Bottom = this.Grid[this.index(x, y + 1)];
    var Left = this.Grid[this.index(x - 1, y)];
    var TopPoint = new Point(x, y - 1);
    var RightPoint = new Point(x + 1, y);
    var BottomPoint = new Point(x, y + 1);
    var LeftPoint = new Point(x - 1, y);

    if (Top && !Top.Walls[2] && !currenCell.Walls[0] && !this.CurPlayer.isVisited(TopPoint)) {
      possiableMovements.push(TopPoint);
    }
    if (Right && !Right.Walls[3] && !currenCell.Walls[1] && !this.CurPlayer.isVisited(RightPoint)) {
      possiableMovements.push(RightPoint);
    }
    if (Bottom && !Bottom.Walls[0] && !currenCell.Walls[2] && !this.CurPlayer.isVisited(BottomPoint)) {
      possiableMovements.push(BottomPoint);
    }
    if (Left && !Left.Walls[1] && !currenCell.Walls[3] && !this.CurPlayer.isVisited(LeftPoint)) {
      possiableMovements.push(LeftPoint);
    }
    return possiableMovements;
  }
  index(x, y) {
    if (x < 0 || y < 0 || x > this.Size - 1 || y > this.Size - 1) {
      return -1;
    }
    return x + y * this.Size;
  }
}
class Player {
  constructor(InitialPoint) {
    this.Location = InitialPoint;
    this.Path = [];
    this.LockedPoint = [];
  }
  show(w) {
    let x = this.Location.X * w;
    let y = this.Location.Y * w;
    noStroke();
    fill(0, 255, 0, 150);
    rect(x, y, w, w);
  }
  isVisited(point) {
    var bool1 = this.Path.some(p => p.equals(point));
    var bool2 = this.LockedPoint.some(p => p.equals(point));
    return bool1 || bool2;
  }
}
class Point{
  constructor(x, y){
    this.X = x;
    this.Y = y;
  }
  equals(point){
    return this.X === point.X && this.Y === point.Y;
  }
}