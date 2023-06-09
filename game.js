class Sprite {
    constructor(x, y, imgurl, width, height) {
      this.x = x;
      this.y = y;
      this.img = new Image();
      this.img.src = imgurl;
      this.width = width;
      this.height = height;
    }

    scale(scaleX, scaleY) {
      this.width *= scaleX;
      this.height *= scaleY;
    }
  
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  
    collidesWith(sprite) {
      return this.x < sprite.x + sprite.width &&
             this.x + this.width > sprite.x &&
             this.y < sprite.y + sprite.height &&
             this.y + this.height > sprite.y;
    }

    move(x, y) {
      this.x += x;
      this.y += y;
    }
  
    destroy() {
      this.x = -Infinity;
      this.y = -Infinity;
    }
  }

class EmptySprite {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    collidesWith(sprite) {
      return this.x < sprite.x + sprite.width &&
             this.x + this.width > sprite.x &&
             this.y < sprite.y + sprite.height &&
             this.y + this.height > sprite.y;
    }

    move(x, y) {
      this.x += x;
      this.y += y;
    }
  }
  
  class GameEvent {
    constructor() {
      this.pressedKeys = new Set();
  
      document.addEventListener("keydown", event => {
        this.pressedKeys.add(event.code);
      });
  
      document.addEventListener("keyup", event => {
        this.pressedKeys.delete(event.code);
      });

      
    }
  
    isDown(key) {
      return this.pressedKeys.has(key);
    }
  }  

class Shape {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  scale(scaleX, scaleY) {
    this.width *= scaleX;
    this.height *= scaleY;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  collidesWith(sprite) {
    return this.x < sprite.x + sprite.width &&
           this.x + this.width > sprite.x &&
           this.y < sprite.y + sprite.height &&
           this.y + this.height > sprite.y;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
  
  destroy() {
    this.x = -Infinity;
    this.y = -Infinity;
  }
}

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  scale(scaleX, scaleY) {
    this.width *= scaleX;
    this.height *= scaleY;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  collidesWith(sprite) {
    const dx = this.x - (sprite.x + sprite.width / 2);
    const dy = this.y - (sprite.y + sprite.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + Math.sqrt(sprite.width * sprite.width + sprite.height * sprite.height) / 2;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
  
  destroy() {
    this.x = -Infinity;
    this.y = -Infinity;
  }
}

class TextObj {
  constructor(x, y, text, size=50, font="ＭＳ ゴシック", color="black") {
    this.x = x;
    this.y = y;
    this.text = text;
    this.font = font;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px ${this.font}`;
    ctx.fillText(this.text, this.x, this.y);
  }

  collidesWith(sprite) {
    return this.x < sprite.x + sprite.width &&
           this.x + this.width > sprite.x &&
           this.y < sprite.y + sprite.height &&
           this.y + this.height > sprite.y;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  destroy() {
    this.x = -Infinity;
    this.y = -Infinity;
  }
}

class LoadAudio {
  constructor(src) {
    this.Audio = new Audio(src);
  }

  play() {
    this.Audio.play();
  }

  pause() {
    this.Audio.pause();
  }
}

class Mouse{
  constructor(canvas){
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
    this.clickedSprite = null;
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      this.x = event.clientX - rect.left;
      this.y = event.clientY - rect.top;
    });
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.clickedSprite = this.checkCollision(x, y);
    });
  }
  checkCollision(x, y, sprites){
    for(let sprite of sprites){
      if(sprite.collidesWith(new EmptySprite(x,y,1,1))){
        return sprite;
      }
    }
    return null;
  }
}

class Game {
  constructor() {
    
  }

  update() {
    
  }

  loop(fps=60) {
   this.loopInterval = setInterval(this.update, 1000/fps)
  }

  stop() {
    clearInterval(this.loopInterval)
  }
}
