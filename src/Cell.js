export default class Cell {
  constructor(cellSize, i, j, ctx, genome) {
    this.cellSize = cellSize;
    this.foodAmount = 1000000;
    this.i = i;
    this.j = j;
    this.ctx = ctx
    this.genome = genome
    this.dead = false
    this.volume = 10
    this.readyToMitosis = false
  }

  paint() {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.genome ? this.genome.color.rgb.r : 155}, ${this.genome ? this.genome.color.rgb.g : 44}, ${this.genome ? this.genome.color.rgb.b : 44}, 1)`;
    //this.ctx.lineWidth = "1";
    this.ctx.strokeStyle = "#000000";
    this.ctx.rect(this.i * this.cellSize, this.j * this.cellSize, this.cellSize - 1, this.cellSize - 1);
    this.ctx.stroke();
    this.ctx.fill();
  }

  receiveGenome(newGenome) {
    this.genome = newGenome
  }

  metabolism() {
    if (this.foodAmount <= 0) {
      this.death()
    } else {
      this.eat()

      if (this.volume > this.genome.mitosisVolume) {
        this.readyToMitosis = true
      }
    }
  }

  mutate() {
    // if (this.genome) {
    //   this.genome.r = Math.floor(255 * Math.random())
    //   this.genome.g = Math.floor(255 * Math.random())
    //   this.genome.b = Math.floor(255 * Math.random())
    // }
  }

  eat() {
    const amountEaten = Math.random() * 5
    this.foodAmount -= amountEaten
    this.volume += amountEaten
  }

  death() {
    this.genome = {
      color: {
        colorName: "grey",
        rgb: { r: 45, g: 55, b: 72 },
        hexColor: "#2D3748"
      }
    }
    this.dead = true
  }
}




/*
Color:

Background: #d9d9d9
Petri dish, red.700: #9B2C2C (155, 44, 44)

*/