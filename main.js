Math.seedrandom(0);
let can = document.getElementById('main');
let con = can.getContext('2d');
const scale = 1;
function draw (x, y, color) {
    con.fillStyle = color;
    con.fillRect(x - 3, y - 3, 6, 6);
}
can.width = window.innerWidth*scale;
can.height = window.innerHeight*scale;

let yellow = addParticles(800);
let red = addParticles(500);
let green = addParticles(2000);

function update () {
    behaviour(yellow, yellow, -0.5,200);
    behaviour(yellow, red, -0.5,100);
    behaviour(yellow, green, 0.8);

    behaviour(red, yellow, -0.8);
    behaviour(red, red, -0.8);
    behaviour(red, green, -1.2);
    
    behaviour(green, yellow, 0.3);
    behaviour(green, red, -0.5);
    behaviour(green, green, 0.01);  
    

    con.fillStyle = 'rgba(0, 0, 0, 0.05)';
    con.fillRect(0, 0, window.innerWidth*scale, window.innerHeight*scale);



    for (let i in yellow) {
        draw(yellow[i].x, yellow[i].y, 'yellow')
    }
    for (let i in red) {
        draw(red[i].x, red[i].y, 'red')
    }
    for (let i in green) {
        draw(green[i].x, green[i].y, 'green')
    }

    requestAnimationFrame(update);
}
update();

function addParticles (count, mass = 0.5) {
    let part = [];
    for (let i = 0; i < count*scale*scale; i++) {
        part.push({
            x: Math.random()*can.width|0,
            y: Math.random()*can.height|0,
            vx: 0,
            vy: 0,
            m: mass
        });
    }
    return part;
} 

function behaviour (par1, par2, g, d = 80) {
    for (let i = 0; i < par1.length; i++) {
        let fx = 0;
        let fy = 0;
        let a = null;
        let b = null;
        for (let j=0; j < par2.length; j++) {
            a = par1[i];
            b = par2[j];
            let distancex = a.x-b.x;
            let distancey = a.y-b.y;
            let distance = Math.sqrt(distancex*distancex + distancey*distancey);
            if (distance > 0 && distance < d) {
                let force = g * (a.m+b.m)/distance;
                fx += force*distancex;
                fy += force*distancey;
            }
        }
        a.vx = (a.vx + fx)*0.5;
        a.vy = (a.vy + fy)*0.5;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0) {
            a.vx *= -1;
            a.x = 0;
        } else if (a.x >= can.width) {
            a.vx *= -1;
            a.x = can.width;
        }
        if (a.y <= 0) {
            a.vy *= -1;
            a.y = 0;
        } else if (a.y >= can.height) {
            a.vy *= -1;
            a.y = can.height;
        }
    }
}