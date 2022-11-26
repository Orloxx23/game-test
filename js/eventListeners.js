window.addEventListener("keydown", (e) => {
  if (player.preventInput) return;
  switch (e.key) {
    case "w":
      for (const element of doors) {
        const door = element;

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y <= door.position.y + door.height &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
        } else {
          if (player.velocity.y === 0) player.velocity.y = -15;
        }
      }

      break;
    case " ":
      if (player.velocity.y === 0) player.velocity.y = -15;
      break;
    case "ArrowUp":
      if (player.velocity.y === 0) player.velocity.y = -15;
      break;

    case "a":
      keys.a.pressed = true;
      break;
    case "ArrowLeft":
      keys.a.pressed = true;
      break;

    case "d":
      keys.d.pressed = true;
      break;
    case "ArrowRight":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowLeft":
      keys.a.pressed = false;
      break;

    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowRight":
      keys.d.pressed = false;
      break;
  }
});
