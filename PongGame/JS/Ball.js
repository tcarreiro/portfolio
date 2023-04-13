const INITIAL_VELOCITY = .04
const ACCELERATION = 0.000000000001

export default class Ball {
    constructor(ballElem) {
        this.ballElem= ballElem
        this.kickoff()
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--positionX"))
    }

    set x(value) {
        this.ballElem.style.setProperty("--positionX", value)
    }
    
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--positionY"))
    }
    
    set y(value) {
        this.ballElem.style.setProperty("--positionY", value)
    }


    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    kickoff() {
        this.x = 50
        this.y = 50
        this.direction = {x: 0}
        while(Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x >= .9)) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += ACCELERATION * delta
        const rect = this.rect()

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }

        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min;
}

function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.top &&
        rect1.bottom >= rect2.bottom
    )
}
