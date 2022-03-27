let elems = []
let i = 0

while (i < 15000){
    elems.push(new Element())
    i++;
}

let colors = ["#ff0083", "#ff0048", "#c800ff", "#f700ff", "#0356fc", "#ff009a", "#8800ff"]

let m_ctrl = 0;
let c_ctrl = 0;

function gameloop(){
    ctx.clearRect(0, 0, width, height)

    if (c_ctrl == 20){
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        c_ctrl = 0
    }
    c_ctrl++;
    
    elems.forEach(e => {
        e.spawn()
        e.move(e.path[m_ctrl][0], e.path[m_ctrl][1])
    })
    if (m_ctrl < divisions){
        m_ctrl++;
    }
    requestAnimationFrame(gameloop)
}

//________________________________________________________
async function streamVideo() {
    const constraints = {
        audio: false,
        video: {
            width: window.innerWidth, height: window.innerHeight - 3.0000000000001
        }
    };
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.stream = stream;
        video.srcObject = stream; 
         
    } catch (e) {
        alert("An error occurred while accessing the web cam.");
    }   
  }
  
streamVideo()

const s_canvas = document.getElementById("streamCanvas")
const s_ctx = s_canvas.getContext('2d');
const e_canvas = document.getElementById("edgeDetectionCanvas");
const e_ctx = e_canvas.getContext("2d")

function edgeDetection() {
    s_ctx.drawImage(video, 0, 0); 
    var src = cv.imread("streamCanvas");
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    cv.Canny(src, src, 50, 100, 3, false);
    cv.imshow("edgeDetectionCanvas", src);
    src.delete();
}

video.style.display = "none";

//Remove this line and the two // from the next two lines to see live display

//document.getElementById("edgeDetectionCanvas").style.display = "block"
//setInterval(edgeDetection, 0)

let coordinates = []
document.addEventListener("keydown", e => { 
    edgeDetection()
    if (e.key == " "){
    coordinates = get_pixels(e_ctx)
    elems.forEach(e => {
        if (coordinates.length == 0){
            e.target = {
                x: width,
                y: Math.random() * height
            }
            e.path = gen_path(e.pos.x, e.pos.y, e.target.x, e.target.y, divisions)
        }
        else{
        factor = Math.floor(Math.random() * coordinates.length)
        e.target = {
            x: coordinates[factor][0],
            y: coordinates[factor][1]
        }
        e.path = gen_path(e.pos.x, e.pos.y, e.target.x, e.target.y, divisions)
        coordinates.splice(factor, 1)
    }
})
    m_ctrl = 0
}
})

//________________________________________________________


requestAnimationFrame(gameloop)