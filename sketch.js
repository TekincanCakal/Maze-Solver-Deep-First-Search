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

function setup() 
{
    let cnv = createCanvas(CanvasSize, CanvasSize);
    cnv.parent("canvas"); 
    Start = false;
    Slider = document.getElementById("frameRateSlider");
    SliderText = document.getElementById("frameRateSliderText");
    TimerText = document.getElementById("timerText");
    StartButton = document.getElementById("startButton");
    SliderText.innerHTML = "FrameRate: " + this.Slider.value
    Slider.oninput = function () 
    {
        SliderText.innerHTML = "FrameRate: " + this.value;
    }
    document.getElementById('inputfile').addEventListener('change', function () 
    {
        var fr = new FileReader();
        fr.onload = function () 
        {
            MazeGame = new Maze();
            MazeGame.load(JSON.parse(fr.result), CanvasSize);
            StartButton.disabled = false;
        }
        fr.readAsText(this.files[0]);
    });
}

function startStop() 
{
    Start = !Start;
    if (Start) 
    {
        StartButton.innerHTML = "Stop"
    }
    else 
    {
        StartButton.innerHTML = "Start";
    }
}

function draw() 
{
    frameRate(parseInt(Slider.value));
    background(51);
    if (this.MazeGame) 
    {
        this.MazeGame.Grid.forEach(cell => 
        {
            this.MazeGame.showCell(cell, false);
        });
        if (!this.MazeGame.CurrentPlayer) 
        {
            if (animationFinishPoint <= this.FinishedPlayers[0].Path.length - 1) 
            {
                for (let i = 0; i <= animationFinishPoint; i++) 
                {
                    this.MazeGame.showCell(this.MazeGame.Grid[this.MazeGame.index(this.FinishedPlayers[0].Path[i])], true);
                }
                animationFinishPoint++;
            }
            else
            {
                for (let i = 0; i <= animationFinishPoint; i++) 
                {
                    this.MazeGame.showCell(this.MazeGame.Grid[this.MazeGame.index(this.FinishedPlayers[0].Path[i])], true);
                }
            }
            StartButton.disabled = true;
        }
        else 
        {
            this.MazeGame.CurrentPlayer.Path.forEach(p => 
            {
                this.MazeGame.showCell(this.MazeGame.Grid[this.MazeGame.index(p)], true);
            });
            this.MazeGame.showCurrentPlayer();
            if (Start) 
            {
                if (frameCount % 60 == 0) 
                {
                    Timer[0]++;
                    if (Timer[0] == 60) 
                    {
                        Timer[0] = 0;
                        Timer[1]++;
                    }
                    if (Timer[1] == 60) 
                    {
                        Timer[1] = 0;
                        Timer[2]++;
                    }
                    let temp = "Time Eleapsed: ";
                    if (Timer[2] <= 9) 
                    {
                        temp = temp.concat("0" + Timer[2] + ":");
                    }
                    else 
                    {
                        temp = temp.concat(Timer[2] + ":");
                    }
                    if (Timer[1] <= 9) 
                    {
                        temp = temp.concat("0" + Timer[1] + ":");
                    }
                    else 
                    {
                        temp = temp.concat(Timer[1] + ":");
                    }
                    if (Timer[0] <= 9) 
                    {
                        temp = temp.concat("0" + Timer[0]);
                    }
                    else 
                    {
                        temp = temp.concat(Timer[0]);
                    }
                    TimerText.innerHTML = temp;
                }
                if (this.MazeGame.CurrentPlayer.Location.X == this.MazeGame.Size - 1 && this.MazeGame.CurrentPlayer.Location.Y == this.MazeGame.Size - 1) 
                {
                    this.FinishedPlayers.push(this.MazeGame.CurrentPlayer);
                    this.MazeGame.CurrentPlayer = this.MazeGame.Players.pop();
                }
                else 
                {
                    var possiableMovements = this.MazeGame.currentPlayerPossibleMovements();
                    if (possiableMovements.length > 0) 
                    {
                        var newPlayer = {Location: possiableMovements[0], Path: [possiableMovements[0]], LockedPoints: []};
                        for (let x = 0; x < this.MazeGame.CurrentPlayer.Path.length; x++) 
                        {
                            newPlayer.Path.push(this.MazeGame.CurrentPlayer.Path[x]);
                        }
                        this.MazeGame.CurrentPlayer.LockedPoints.push(possiableMovements[0]);
                        this.MazeGame.Players.push(this.MazeGame.CurrentPlayer);
                        this.MazeGame.CurrentPlayer = newPlayer;
                    }
                    else 
                    {
                        this.MazeGame.CurrentPlayer = this.MazeGame.Players.pop();
                    }
                }
            }
        }
    }
}
