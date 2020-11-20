export default class Cell {
  constructor(cellSize, i, j, ctx, genome) {
    this.cellSize = cellSize;
    this.foodAmount = 100;
    this.i = i;
    this.j = j;
    this.ctx = ctx
    this.genome = genome
    this.dead = false
    this.readyToMitosis = false
  }

  paint() {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.genome ? this.genome.r : 210}, ${this.genome ? this.genome.g : 120}, ${this.genome ? this.genome.b : 120}, 1)`;
    //this.ctx.strokeStyle = "#000000";
    this.ctx.rect(this.i * this.cellSize, this.j * this.cellSize, this.cellSize, this.cellSize);
    //this.ctx.stroke();
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

      let b = Math.random()

      if (b < 0.5) {
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
    this.foodAmount -= Math.random() * 5
  }

  death() {
    this.genome = { r: 0, g: 0, b: 0 }
    this.dead = true
  }
}