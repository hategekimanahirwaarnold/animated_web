let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// c.fillStyle = 'rgb(255, 0, 0)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgb(0, 244, 0)';
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = 'rgb(255, 0, 255)';
// c.fillRect(300, 100, 100, 100)
// // c.fillRect(400, 200, 100, 100)
// // c.fillRect(500, 100, 100, 100)

// //line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 200);
// c.strokeStyle = "blue"
// c.stroke()

// //arc
// for (var i = 0; i < 50; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath()
//     c.arc(x, y, 30, 0, Math.PI * 2);
//     c.stroke()
// }



// c.beginPath();
// c.arc(x, y, r, 0, Math.PI * 2, false);
// c.strokeStyle = "blue"
// c.stroke();

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50;
// var minRadius = 4;

let colorArray = [
    '#22BABB',
    '#348888',
    '#9EF8EE',
    '#FA7F08',
    '#F24405',
    // 'yellow'
];

window.addEventListener('mousemove', function(event) {
       mouse.x = event.x;
       mouse.y = event.y;
    //    console.log(mouse);
});
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
function circles(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minRadius = r;
    this.color =  colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.strokeStyle = "yellow"
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0)
        {
            this.dy = -this.dy;
        }
        this.y += this.dy;
        this.x += this.dx;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.r < maxRadius)
                this.r += 1;
        } else if (this.r > this.minRadius) {
            this.r -= 1;
        }

        this.draw();
    }
}

var circleArray = [];
function init() {
    circleArray = [];

    for (let i = 0; i < 800; i++) {
        let r = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - 2 * r) + r;
        let y = Math.random() * (innerHeight - 2 * r) + r;
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;
        circleArray.push(new circles(x, y, dx, dy, r));
    }
}

init();
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}


animate();