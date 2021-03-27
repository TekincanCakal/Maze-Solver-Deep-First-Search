class Maze 
{
    constructor(size, canvasSize) 
    {
        this.Size = size;
        this.BoxSize = canvasSize / this.Size;
        this.Grid = [];
        this.Players = [];
        this.CurrentPlayer = {Location: {X: 0, Y: 0}, Path: [{X: 0, Y: 0}], LockedPoints: []};
        for(let y = 0; y < this.Size; y++)
        {
            for(let x = 0; x < this.Size; x++)
            {
                this.Grid.push({Location: {X: x, Y: y}, Walls: [true, true, true, true]});
            }
        }
    }
    load(grid, canvasSize)
    {
        this.Size = Math.sqrt(grid.length);
        this.BoxSize = canvasSize / this.Size;
        this.Grid = grid;
        this.Players = [];
        this.CurrentPlayer = {Location: {X: 0, Y: 0}, Path: [{X: 0, Y: 0}], LockedPoints: []};
    }
    currentPlayerIsVisited(cell)
    {
        var isVisited = this.CurrentPlayer.Path.some(p => p.X === cell.Location.X && p.Y === cell.Location.Y);
        var isLocked = this.CurrentPlayer.LockedPoints.some(p => p.X === cell.Location.X && p.Y === cell.Location.Y);
        return isVisited || isLocked;
    }
    showCell(cell, isVisited)
    {
        let x = cell.Location.X * this.BoxSize;
        let y = cell.Location.Y * this.BoxSize;
        stroke(255);
        if (cell.Walls[0]) 
        {
            line(x, y, x + this.BoxSize, y);
        }
        if (cell.Walls[1]) 
        {
            line(x + this.BoxSize, y, x + this.BoxSize, y + this.BoxSize);
        }
        if (cell.Walls[2]) 
        {
            line(x + this.BoxSize, y + this.BoxSize, x, y + this.BoxSize);
        }
        if (cell.Walls[3]) 
        {
            line(x, y + this.BoxSize, x, y);
        }
        if(isVisited)
        {
           noStroke();
            fill(255, 0, 255, 100);
           rect(x, y, this.BoxSize, this.BoxSize);
        }
    }
    showCurrentPlayer()
    {
        let x = this.CurrentPlayer.Location.X * this.BoxSize;
        let y =  this.CurrentPlayer.Location.Y * this.BoxSize;
        noStroke();
        fill(0, 255, 0, 150);
        rect(x, y, this.BoxSize, this.BoxSize);
    }
    currentPlayerPossibleMovements() 
    {
        var possiableMovements = [];
        var currenCell = this.Grid[this.index(this.CurrentPlayer.Location)];
        var Top = this.Grid[this.index({X: this.CurrentPlayer.Location.X, Y: this.CurrentPlayer.Location.Y - 1})];
        var Right = this.Grid[this.index({X: this.CurrentPlayer.Location.X + 1, Y: this.CurrentPlayer.Location.Y})];
        var Bottom = this.Grid[this.index({X: this.CurrentPlayer.Location.X, Y: this.CurrentPlayer.Location.Y + 1})];
        var Left = this.Grid[this.index({X: this.CurrentPlayer.Location.X - 1, Y: this.CurrentPlayer.Location.Y})];
        if (Top && !Top.Walls[2] && !currenCell.Walls[0] && !this.currentPlayerIsVisited(Top)) 
        {
            possiableMovements.push(Top.Location);
        }
        if (Right && !Right.Walls[3] && !currenCell.Walls[1] && !this.currentPlayerIsVisited(Right)) 
        {
            possiableMovements.push(Right.Location);
        }
        if (Bottom && !Bottom.Walls[0] && !currenCell.Walls[2] && !this.currentPlayerIsVisited(Bottom)) 
        {
            possiableMovements.push(Bottom.Location);
        }
        if (Left && !Left.Walls[1] && !currenCell.Walls[3] && !this.currentPlayerIsVisited(Left)) 
        {
            possiableMovements.push(Left.Location);
        }
        return possiableMovements;
    }
    index(point) 
    {
        if (point.X < 0 || point.Y < 0 || point.X > this.Size - 1 || point.Y > this.Size - 1) 
        {
            return -1;
        }
        return point.X + (point.Y * this.Size);
    }
}