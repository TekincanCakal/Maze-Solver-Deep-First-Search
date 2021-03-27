class Cell {
  constructor(x, y) {
    this.X = x;
    this.Y = y;
    this.Walls = [true, true, true, true];
  }
  highlight(w) {
    let x = this.X * w;
    let y = this.Y * w;
    noStroke();
    fill(0, 255, 0, 150);
    rect(x, y, w, w);
  }
  show(w) {
    let x = this.X * w;
    let y = this.Y * w;
    stroke(255);
    if (this.Walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.Walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.Walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.Walls[3]) {
      line(x, y + w, x, y);
    }
  }
  showVisited(w) {
    let x = this.X * w;
    let y = this.Y * w;
    noStroke();
    fill(255, 0, 255, 100);
    rect(x, y, w, w);
  }
}