const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

const player = new Player({
  collisionBlocks,
  image: "assets/img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      image: "assets/img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      image: "assets/img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      image: "assets/img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      image: "assets/img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      image: "assets/img/king/enterDoor.png",
      onComplete: () => {
        nextLevel();
      },
    },
  },
});

let level = 1;
let totalLevels = 2;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 205;
      player.position.y = 377;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        image: "assets/img/backgroundLevel1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 783,
            y: 385 - 112,
          },
          image: "assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoPlay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 97;
      player.position.y = 134;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        image: "assets/img/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 771,
            y: 448 - 112,
          },
          image: "assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoPlay: false,
        }),
      ];
    },
  },
};

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  collisionBlocks.forEach((CollisionBlock) => {
    CollisionBlock.draw();
  });

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "#3f3851";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

function nextLevel() {
  gsap.to(overlay, {
    opacity: 1,
    onComplete: () => {
      level++;
      if(level === totalLevels+1) level = 1;
      levels[level].init();
      player.switchSprite("idleRight");
      player.preventInput = false;
      gsap.to(overlay, {
        opacity: 0,
      });
    },
  });
}

levels[level].init();
animate();
