export default class Cell {
  constructor(cellSize, i, j, ctx, genome) {
    this.cellSize = cellSize;
    this.foodAmount = 100;
    this.i = i;
    this.j = j;
    this.ctx = ctx
    this.genome = genome
  }

  paint() {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.genome ? this.genome.r : 220}, ${this.genome ? this.genome.r : 220}, ${this.genome ? this.genome.r : 110}, ${this.foodAmount / 100})`;
    //this.ctx.strokeStyle = "#000000";
    this.ctx.rect(this.i * this.cellSize, this.j * this.cellSize, this.cellSize, this.cellSize);
    //this.ctx.stroke();
    this.ctx.fill();
  }

  receiveGenome(newGenome) {
    this.genome = newGenome
  }
}