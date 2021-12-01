class Ship {
  constructor ({x, y, angle}) {
    this.x = x
    this.y = y
    this.angle = angle
  }
  move (distance) {
    this.x = Math.round(Math.cos(this.angle * Math.PI / 180) * distance + this.x)
    this.y = Math.round(Math.sin(this.angle * Math.PI / 180) * distance + this.y)
    return this
  }
  north (distance) {
    this.y+=distance
    return this
  }
  south (distance) {
    this.y-=distance
    return this
  }

  east (distance) {
    this.x+=distance
    return this
  }

  west (distance) {
    this.x-=distance
    return this
  }

  turn (angle) {
    this.angle += angle
    return this
  }
}

module.exports = Ship