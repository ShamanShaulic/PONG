var app = new PIXI.Application(1200, 720, { antialias: true });
document.body.appendChild(app.view);
var ball_sprite, p1_sprite, p2_sprite
var isGoal = false;
var playerSpeed = 5;
var p1_score = 0;
var p2_score = 0;
var graphics = new PIXI.Graphics(); //  Graphics, iscrtavanje jednostavnih oblika


var ballTrail_sprites = [];


var style = new PIXI.TextStyle({
	 fontFamily: 'Arial',
     fontSize: 300,
     fill: ['#ffffff33'],
     align: 'center'

});

var p1ScoreText = new PIXI.Text('0', style);
p1ScoreText.x = app.screen.width / 4
p1ScoreText.y = app.screen.height / 2
p1ScoreText.anchor.set(0.5)
app.stage.addChild(p1ScoreText);

var p2ScoreText = new PIXI.Text('0', style);
p2ScoreText.x = app.screen.width * 3 / 4
p2ScoreText.y = app.screen.height / 2
p2ScoreText.anchor.set(0.5)
app.stage.addChild(p2ScoreText);

// draw a rounded rectangle
graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0xFF00FF, 1);
graphics.beginFill(0xFF00BB, 0.25);
graphics.drawRoundedRect(0, 0, 10, 150, 7);
//(,,,,radius)
graphics.endFill();
p1_sprite = new PIXI.Sprite(graphics.generateTexture())
p1_sprite.anchor.set(0.5)
p1_sprite.ai = false;

graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0xFF00FF, 1);
graphics.beginFill(0xFF00BB, 0.25);
graphics.drawRoundedRect(0, 0, 10, 150, 7);
//(,,,,radius)
graphics.endFill();
p2_sprite = new PIXI.Sprite(graphics.generateTexture())
p2_sprite.anchor.set(0.5)
p2_sprite.ai = false;

// draw a circle, set the lineStyle to zero so the circle doesn't have an outline
graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0x00FFFF , 1);
graphics.beginFill(0x00FFFF, 0.5);
graphics.drawCircle(0,0,10);
graphics.endFill();
ball_sprite = new PIXI.Sprite(graphics.generateTexture())
ball_sprite.anchor.set(0.5)
var trailLength = 100;
for (var i = 0; i < trailLength; i++) {
	ballTrail_sprites[i] = new PIXI.Sprite(graphics.generateTexture())
	ballTrail_sprites[i].anchor.set(0.5);
	app.stage.addChild(ballTrail_sprites[i]);

	ballTrail_sprites[i].alpha = 0.9 - (i / trailLength);
	ballTrail_sprites[i].scale.set(0.9 - (i / trailLength));

}

app.stage.addChild(ball_sprite);
app.stage.addChild(p1_sprite);
app.stage.addChild(p2_sprite); 




function startNewGame() {

	resetBalls()
	p2_sprite.y = app.screen.height / 2;
	p2_sprite.x =  app.screen.width - 20;
	p1_sprite.y = app.screen.height / 2;
	p1_sprite.x = 20;
	p1_score = 0;
	p2_score = 0;
	updateScore()
	
	p1_sprite.ySpeed = 0;
	p2_sprite.ySpeed = 0;

	app.ticker.add(function(delta) {

		if ( ball_sprite.y + ball_sprite.ySpeed - ball_sprite.height / 2 < 0) {
			ball_sprite.ySpeed = Math.abs(ball_sprite.ySpeed)
		}

		if ( ball_sprite.y + ball_sprite.ySpeed + ball_sprite.height / 2 > app.screen.height) {
			ball_sprite.ySpeed = -Math.abs(ball_sprite.ySpeed)
		}

		if (!isGoal)
		{
			if ( ball_sprite.x + ball_sprite.width / 2 > app.screen.width) {
			p1_score++
			updateScore()
			isGoal = true;
			setTimeout(resetBalls, 1000)
		}

			if ( ball_sprite.x - ball_sprite.width / 2 < 0) {
			p2_score++
			updateScore()
			isGoal = true;
			setTimeout(resetBalls, 1000)
		}
		}

		if (!isGoal) {

			if ((ball_sprite.x + ball_sprite.xSpeed - ball_sprite.width / 2 < p1_sprite.x + p1_sprite.width / 2) && 
				(ball_sprite.y + ball_sprite.ySpeed < p1_sprite.y + p1_sprite.height / 2) && 
				(ball_sprite.y + ball_sprite.ySpeed > p1_sprite.y - p1_sprite.height / 2)) {
			ball_sprite.xSpeed = Math.abs(ball_sprite.xSpeed)
			ball_sprite.xSpeed *= 1.05;
			ball_sprite.ySpeed *= 1.05;
		}

			if ((ball_sprite.x + ball_sprite.xSpeed + ball_sprite.width / 2 > p2_sprite.x - p2_sprite.width / 2) && 
				(ball_sprite.y + ball_sprite.ySpeed < p2_sprite.y + p2_sprite.height / 2) && 
				(ball_sprite.y + ball_sprite.ySpeed > p2_sprite.y - p2_sprite.height / 2)) {
			ball_sprite.xSpeed = -Math.abs(ball_sprite.xSpeed)
			ball_sprite.xSpeed *= 1.05;
			ball_sprite.ySpeed *= 1.05;
		}

			
	}


		p1_sprite.y += p1_sprite.ySpeed;
		p1_sprite.y=Math.min(p1_sprite.y,app.screen.height - p1_sprite.height/2 - 10);
		p1_sprite.y=Math.max(p1_sprite.y,p1_sprite.height/2 + 10);
		p2_sprite.y += p2_sprite.ySpeed;
		p2_sprite.y=Math.min(p2_sprite.y,app.screen.height - p2_sprite.height/2 - 10);
		p2_sprite.y=Math.max(p2_sprite.y,p2_sprite.height/2 + 10);


		for (var i = ballTrail_sprites.length - 1; i >= 1; i--) {
			ballTrail_sprites[i].x = ballTrail_sprites[i-1].x
			ballTrail_sprites[i].y = ballTrail_sprites[i-1].y
		}

		ballTrail_sprites[0].x = ball_sprite.x
		ballTrail_sprites[0].y = ball_sprite.y

		ball_sprite.x += ball_sprite.xSpeed;
		ball_sprite.y += ball_sprite.ySpeed;


});

}

function resetBalls() {
	isGoal = false;
	ball_sprite.x = app.screen.width / 2; 
	ball_sprite.y = app.screen.height / 2; 

	ball_sprite.xSpeed = 8 * (Math.floor(Math.random() * 2) * 2 - 1);
	ball_sprite.ySpeed = 8 * (Math.floor(Math.random() * 2) * 2 - 1);
}


document.addEventListener('keydown', onKeyDown);

function onKeyDown(key) {
	console.log(p2_sprite.ai)
if (p1_sprite.ai === false) {
 // W Key is 87
 if (key.keyCode === 87 ) {
  // p1_sprite.y -= playerSpeed;
  p1_sprite.ySpeed = -playerSpeed;
 }
 // S Key is 83
 if (key.keyCode === 83) {
  // p1_sprite.y += playerSpeed
  p1_sprite.ySpeed = playerSpeed;
 	}
}
if (p2_sprite.ai === false) {
// Down arrow is 40
if (key.keyCode === 40) {
	// p2_sprite.y += playerSpeed
	p2_sprite.ySpeed = playerSpeed;
	}
// Up arrow is 87
 if (key.keyCode === 38) {
  // p2_sprite.y -= playerSpeed
  p2_sprite.ySpeed = -playerSpeed;
 		}
	}
}

document.addEventListener('keyup', onKeyUp);

function onKeyUp(key) {
if (p1_sprite.ai === false) {
 // W Key is 87
 if (key.keyCode === 87 && p1_sprite.ySpeed < 0 ) {
  // p1_sprite.y -= playerSpeed;
  p1_sprite.ySpeed = 0;
 }
  // S Key is 83
 if (key.keyCode === 83 && p1_sprite.ySpeed > 0) {
  // p1_sprite.y += playerSpeed
  p1_sprite.ySpeed = 0;
 	}
}
if (p2_sprite.ai === false) {
// Up arrow is 87
 if (key.keyCode === 38 && p2_sprite.ySpeed < 0) {
  // p2_sprite.y -= playerSpeed
  p2_sprite.ySpeed = 0;
 }
// Down arrow is 40
if (key.keyCode === 40 && p2_sprite.ySpeed > 0) {
	// p2_sprite.y += playerSpeed
	p2_sprite.ySpeed = 0;
		}
	}
}

function updateScore() {
	p1ScoreText.text = p1_score;
	p2ScoreText.text = p2_score;
}




startNewGame()






