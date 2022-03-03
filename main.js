import './style.css'
import p5 from 'p5'
import { sketch } from 'p5js-wrapper'

const points = []
const mult = (Math.random() * (0.01 - 0.005) + 0.005)
const color = {
    r: Math.floor(Math.random() * (255 - 50) + 50),
    g: Math.floor(Math.random() * (255 - 50) + 50),
    b: Math.floor(Math.random() * (255 - 50) + 50),
}


function increaseColor() {
    const incrementor = 0.1

    color.r += incrementor

    color.g += incrementor

    color.b += incrementor

    if (color.r < 50) {
        color.r = 50
    }

    if (color.g < 50) {
        color.g = 50
    }

    if (color.b < 50) {
        color.b = 50
    }
}

sketch.setup = () => {
    createCanvas(window.innerWidth, window.innerHeight)
    background(30)
    angleMode(DEGREES)
    noiseDetail(1)

    const density = 30
    const space = width / density

    for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
            const p = createVector(x + random(-10, 10), y + random(-10, 10))
            points.push(p)
        }
    }
}

sketch.draw = () => {
    noStroke()
    fill(255)

    for (const point of points) {
        const r = map(point.x, 0, width,  color.r, color.r)
        const g = map(point.y, 0, height,  color.g, color.g)
        const b = map(point.x, 0, width,  color.b, color.b)
        fill(r, g, b)

        const angle = map(noise(point.x * mult, point.y * mult), 0, 1, 0, 720)
        point.add(createVector(cos(angle), sin(angle)))

        ellipse(point.x, point.y, 1)
    }

    increaseColor()
}
