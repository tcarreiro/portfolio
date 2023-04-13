const PC_MAX_SPEED = .03

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem= paddleElem
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }

    set position(value) {
        this.paddleElem.style.setProperty("--position", value)
    }

    reset() {
        this.position = 50
    }

    rect() {
        return this.paddleElem.getBoundingClientRect()
    }

    update(delta, ballPosition, ballHeight, ballDirection) {
        /*if (ballDirection.x > 0) {
            this.position += PC_MAX_SPEED * delta * (ballHeight - this.position) / Math.max((this.position - ballPosition),7)
        } else {
            if (Math.abs(this.position - 50) < .5) {
                this.position = 50
            } else if (this.position > 50) {
                this.position -= PC_MAX_SPEED * delta
            } else {
                this.position += PC_MAX_SPEED * delta
            }
        }*/
        this.position += PC_MAX_SPEED * delta * (ballHeight - this.position) / Math.max((this.position - ballPosition),4)
    }

}