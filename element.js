class Element{
    constructor(){
        this.size = 0.8
        this.pos = {
            x: Math.random() * width,
            y: Math.random() * height
        }
        this.target = {
            x: Math.random() * 400,
            y: Math.random() * 400
        }
        this.path = gen_path(this.pos.x, this.pos.y, this.target.x, this.target.y, divisions)
    }
    spawn(){
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.size, 0,  2 * Math.PI)
        ctx.fill()
    }
    move(posX, posY){
        this.pos = {
            x: posX,
            y: posY
        }
    }
}