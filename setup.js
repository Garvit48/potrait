const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.setAttribute("width" , window.innerWidth);
canvas.setAttribute("height" , window.innerHeight - 3.0000000000001);

let width = canvas.width;
let height = canvas.height;

ctx.strokeStyle = "#ffffff";
ctx.fillStyle = "#ffffff"


let divisions = 100

function gen_path(x1, y1, x2, y2, num){
    let ctrl = 0
    let x = x1
    let y = 0
    let path = []
    let slope = (y2 - y1)/(x2 - x1);
    while (ctrl <= num){
        y = ((slope * (x - x1)) + y1)
        path.push([x, y])
        x += (x2 - x1)/num;
        ctrl++;
    }
    return path
}

function get_pixels(context){
    let store = []
    let req_arr = []
    img_data = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    pixels = img_data.data;
    for(let i = 0; i < pixels.length; i += 4){
        if (pixels[i] == 255 && pixels[i+1] == 255 && pixels[i+2] == 255 && pixels[i+3] == 255){
            req_arr.push(i/4)
        }
    }
    req_arr.forEach(e => {
        let x = e % context.canvas.width;
        let y = Math.ceil(e / context.canvas.width);
        store.push([x, y])
    })
    return store;
}