var MazeGame;
var CanvasSize = 1028.0;
var Timer = [0, 0, 0];

var Slider;
var SliderText;
var Start;
var TimerText;
var StartButton;
var FinishedPlayers = [];
var animationFinishPoint = 0;
function setup() {
    createCanvas(CanvasSize, CanvasSize);
    Start = false;
    Slider = document.getElementById("frameRateSlider");
    SliderText = document.getElementById("frameRateSliderText");
    TimerText = document.getElementById("timerText");
    StartButton = document.getElementById("startButton");
    SliderText.innerHTML = "FrameRate: " + this.Slider.value
    Slider.oninput = function () {
        SliderText.innerHTML = "FrameRate: " + this.value;
    }
    document.getElementById('inputfile').addEventListener('change', function () {
        var fr = new FileReader();
        fr.onload = function () {
            var text = fr.result;
            var temp = JSON.parse(text);
            MazeGame = new Maze(Math.sqrt(temp.length), CanvasSize);
            for (let y = 0; y < MazeGame.Size; y++) {
                for (let x = 0; x < MazeGame.Size; x++) {
                    var newCell = new Cell(x, y);
                    var index = x + y * MazeGame.Size;
                    newCell.Walls = temp[index].Walls;
                    MazeGame.Grid.push(newCell)
                }
            }
            var initial = new Point(0, 0);
            MazeGame.CurPlayer = new Player(initial);
            MazeGame.CurPlayer.Path.push(initial)
            StartButton.disabled = false;
        }
        fr.readAsText(this.files[0]);
    });
}
function startStop() {
    Start = !Start;
    if (Start) {
        StartButton.innerHTML = "Stop"
    }
    else {
        StartButton.innerHTML = "Start";
    }
}
function draw() {
    frameRate(parseInt(Slider.value));
    background(51);
    if (this.MazeGame) {
        this.MazeGame.Grid.forEach(cell => {
            cell.show(this.MazeGame.BoxSize);
        });
        if (!this.MazeGame.CurPlayer) {
            if (animationFinishPoint > this.FinishedPlayers[0].Path.length - 1) {
                animationFinishPoint = this.FinishedPlayers[0].Path.length - 1;
            }
            for (let i = 0; i <= animationFinishPoint; i++) {
                var p = this.FinishedPlayers[0].Path[i]
                var index = this.MazeGame.index(p.X, p.Y);
                this.MazeGame.Grid[index].showVisited(this.MazeGame.BoxSize);
            }
            animationFinishPoint++;
        }
        else {
            this.MazeGame.CurPlayer.Path.forEach(p => {
                var index = this.MazeGame.index(p.X, p.Y);
                this.MazeGame.Grid[index].showVisited(this.MazeGame.BoxSize);
            });
            this.MazeGame.CurPlayer.show(this.MazeGame.BoxSize);
            if (Start) {
                if (frameCount % 60 == 0) {
                    Timer[0]++;
                    if (Timer[0] == 60) {
                        Timer[0] = 0;
                        Timer[1]++;
                    }
                    if (Timer[1] == 60) {
                        Timer[1] = 0;
                        Timer[2]++;
                    }
                    let temp = "Time: ";
                    if (Timer[2] <= 9) {
                        temp = temp.concat("0" + Timer[2] + ":");
                    }
                    else {
                        temp = temp.concat(Timer[2] + ":");
                    }
                    if (Timer[1] <= 9) {
                        temp = temp.concat("0" + Timer[1] + ":");
                    }
                    else {
                        temp = temp.concat(Timer[1] + ":");
                    }
                    if (Timer[0] <= 9) {
                        temp = temp.concat("0" + Timer[0]);
                    }
                    else {
                        temp = temp.concat(Timer[0]);
                    }
                    TimerText.innerHTML = temp;
                }
                if (this.MazeGame.CurPlayer.Location.equals(new Point(this.MazeGame.Size - 1, this.MazeGame.Size - 1))) {
                    this.FinishedPlayers.push(this.MazeGame.CurPlayer);
                    this.MazeGame.CurPlayer = this.MazeGame.Players.pop();
                }
                else {
                    var canGo = this.MazeGame.getPossiableMovements();
                    if (canGo.length > 0) {
                        var temp = new Player(canGo[0]);
                        for (let x = 0; x < this.MazeGame.CurPlayer.Path.length; x++) {
                            temp.Path.push(this.MazeGame.CurPlayer.Path[x]);
                        }
                        temp.Path.push(canGo[0]);
                        this.MazeGame.CurPlayer.LockedPoint.push(canGo[0]);
                        this.MazeGame.Players.push(this.MazeGame.CurPlayer);
                        this.MazeGame.CurPlayer = temp;
                    }
                    else {
                        this.MazeGame.CurPlayer = this.MazeGame.Players.pop();
                    }
                }
            }
        }
    }
}