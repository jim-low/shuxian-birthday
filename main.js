import './style.css'
import { sketch } from 'p5js-wrapper'

const points = []
const mult = (Math.random() * (0.01 - 0.005) + 0.005)
const minColor = 60
const color = {
    r: Math.floor(Math.random() * (255 - minColor) + minColor),
    g: Math.floor(Math.random() * (255 - minColor) + minColor),
    b: Math.floor(Math.random() * (255 - minColor) + minColor),
}
const angles = [ 90, 180, 360, 540, 720, 900, 1080 ]

function spawnPoints() {
    points.length = 0
    const density = width <= 650 ? 17 : 30
    const space = width / density

    for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
            const p = createVector(x + random(-10, 10), y + random(-10, 10))
            points.push(p)
        }
    }
}

sketch.setup = () => {
    createCanvas(window.innerWidth, window.innerHeight)
    background(30)
    angleMode(DEGREES)
    noiseDetail(1)

    spawnPoints()
}

sketch.draw = () => {
    noStroke()
    fill(255)

    for (const point of points) {
        const r = map(point.x, 0, width, minColor, color.r)
        const g = map(point.y, 0, height, minColor, color.g)
        const b = map(point.x, 0, width, minColor, color.b)
        fill(r, g, b)

        const angle = map(noise(point.x * mult, point.y * mult), 0, 1, 0, point.angle || 720)
        point.add(createVector(cos(angle), sin(angle)))

        ellipse(point.x, point.y, 1)
    }
}

sketch.windowResized = () => {
    createCanvas(window.innerWidth, window.innerHeight)
    background(30)
    spawnPoints()
}

sketch.mouseClicked = e => {
    // change this to firework explosion
    for (let i = 0; i < angles.length; ++i) {
        const p = createVector(e.clientX, e.clientY)
        p.angle = angles[i]
        points.push(p)
    }
}

document.querySelectorAll('.bday-msg h2 span').forEach((letter, i) => {
    setTimeout(() => {
        letter.style.animation = 'fadeIn 1.5s ease-out forwards'
    }, (i + 1) * 200);
})

setTimeout(() => {
    document.querySelector('.diamond-shuxian').style.animation = 'fadeIn 1.5s ease-out forwards'
}, 3500)
