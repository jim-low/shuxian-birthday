import './style.css'
import p5 from 'p5'
import { sketch } from 'p5js-wrapper'

const points = []
const mult = (Math.random() * (0.01 - 0.005) + 0.005)

sketch.setup = () => {
    createCanvas(window.innerWidth, window.innerHeight)
    background(30)
    angleMode(DEGREES)
    noiseDetail(1)

    const density = 20
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
        const color = {
            r: map(point.x, 0, width,  50, 255),
            g: map(point.y, 0, height, 50, 255),
            b: map(point.x, 0, width,  50, 255)
        }
        fill(color.r, color.g, color.b)

        const angle = map(noise(point.x * mult, point.y * mult), 0, 1, 0, 720)
        point.add(createVector(cos(angle), sin(angle)))

        ellipse(point.x, point.y, 1)
    }
}
