var
  bird,
  base,
  ground,
  pipes_bottom,
  pipes_upper,
  pipe_bottom,
  pipe_upper;


var mainState = {
  preload: function () {
    game.load.image('bg_day', '../src/flappy/assets/sprites/background-day.png');
    game.load.image('base', '../src/flappy/assets/sprites/base.png');
    game.load.image('bird', '../src/flappy/assets/sprites/bluebird-midflap.png');
    game.load.image('pipe', '../src/flappy/assets/sprites/pipe-green.png');
    game.load.image('pipe2', '../src/flappy/assets/sprites/pipe-green.png');
    game.load.image('test', 'pipe.png');
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0, 'bg_day');

    base = game.add.group();
    base.enableBody = true;
    ground = base.create(0, game.world.height - 64, 'base');
    ground.body.immovable = true;


    pipes_bottom = game.add.group();
    pipes_bottom.enableBody = true;

    pipes_upper = game.add.group();
    pipes_upper.enableBody = true;

    // //down pipe
    // pipe = pipes.create(100,game.world.height - 250, 'pipe');
    // pipe.body.immovable = true;
    //
    // //upper pipe
    // pipe = pipes.create(152, game.world.height - 290, 'pipe');
    // pipe.body.immovable = true;
    // pipe.angle = 180;


    game.world.bringToTop(base);
    game.world.bringToTop(pipes_upper);

    bird = game.add.sprite(100,250, 'bird');
    game.physics.arcade.enable(bird);
    bird.body.bounce.y = 0.2;
    bird.body.gravity.y = 1000;

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    game.time.events.loop(1500, this.addRowOfPipes, this);


  },
  update: function () {
    var hitGround = game.physics.arcade.collide(bird, ground);

    // var foo = game.physics.arcade.overlap(bird, pipes_bottom, this.restartGame, null, this);
    // var bar = game.physics.arcade.overlap(bird, pipes_upper, this.restartGame, null, this);

    var overlapBottom = this.checkIfOverlap(bird, pipes_bottom),
        overlapUpper = this.checkIfOverlap(bird, pipes_upper);

    if (overlapUpper === true) {
      console.log('overlapUpper')
    }


    // if ( (overlapBottom === true) || (overlapUpper === true)) {
    //   this.restartGame();
    // }

    // if (hitGround === true) {
    //   this.restartGame();
    // }

  },
  jump: function () {
    bird.body.velocity.y = -350;
  },
  checkIfOverlap: function(spriteA, spriteB) {

  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);

  },
  restartGame: function () {
    game.state.start('main');
  },
  getPipeYPos: function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  },
  addBottomPipe: function(x, y) {
    // Create a pipe at the position x and y
    pipe_bottom = game.add.sprite(x, game.world.height - y, 'pipe');
    // Add the pipe to our previously created group
    pipes_bottom.add(pipe_bottom);
    // Enable physics on the pipe
    game.physics.arcade.enable(pipe_bottom);
    // Add velocity to the pipe to make it move left
    pipe_bottom.body.velocity.x = -200;
    // Automatically kill the pipe when it's no longer visible
    pipe_bottom.checkWorldBounds = true;
    pipe_bottom.outOfBoundsKill = true;
  },
  addUpperPipe: function(x, y) {
    // Create a pipe at the position x and y
    pipe_upper = game.add.sprite(x, game.world.height - y, 'pipe2');
    // pipe_upper = game.add.sprite(x, game.world.height - y, 'pipe2');
    pipe_upper.angle = 180;
    // Add the pipe to our previously created group
    pipes_upper.add(pipe_upper);
    // Enable physics on the pipe
    game.physics.arcade.enable(pipe_upper);
    // Add velocity to the pipe to make it move left
    pipe_upper.body.velocity.x = -200;
    // Automatically kill the pipe when it's no longer visible
    pipe_upper.checkWorldBounds = true;
    pipe_upper.outOfBoundsKill = true;
  },
  addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    // var hole = Math.floor(Math.random() * 5) + 1;

    // var hole = Math.floor(Math.random() * 5) + 1;
    var
      bottomPos = this.getPipeYPos(100,250),
      upperPos = this.getPipeYPos(300, 450);

    this.addBottomPipe(270, bottomPos);
    this.addUpperPipe(318, upperPos);









    // this.addOnePipe(270,  game.world.height - hole, false);
    // this.addOnePipe(318,  (game.world.height - hole) - 150, true);

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    // for (var i = 0; i < 8; i++)
    //   if (i != hole && i != hole + 1)
    //     this.addOnePipe(270,  game.world.height - i * 60 + 10);

    // var pipe1 = this.getPipeYPos(100, 250),
    //     pipe2 = this.getPipeYPos(300, 450);
    // this.addOnePipe(270, pipe1, null);
    // this.addOnePipe(318, pipe2, 180);

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    // for (var i = 0; i < 8; i++)
    //   if (i != hole && i != hole + 1)
    //     this.addOnePipe(270, i * 60 + 10);
  }
};

var game = new Phaser.Game(288, 512, Phaser.AUTO, '');

game.state.add('main', mainState);

game.state.start('main');