//inilize Canvas Enviroment
//make Canvas take the Width & height of the web page after CSS Style 
//get canvas element
const canvas = document.getElementById('canvas');
//rendering canvas with 2D
const ctx = canvas.getContext('2d');
//make canvas take width & height of the web page.
canvas.width = window.innerWidth;
canvas.height=window.innerHeight;
//make array for shapes and move mouse

let arr =[];
let mouse = {
   x: undefined,
   y: undefined,
   radius: canvas.width*(20/100)
}
//create container of the full shapes
class particle {
    constructor(){
        // make size that will be used to set the radous of particles
        this.size= Math.random()*5 + 3;

        this.x = Math.random() * (canvas.width - 50) + (this.size +10);
        this.y =Math.random() * (canvas.height -50) + (this.size +10 );
        this.directionX = Math.random()*5 -2.5 ;
        this.directionY = Math.random()*5 -2.5 ;
        this.color = `#00ffff`;
    }
    update(){
        //will use to change the postion of particles
        this.x -= this.directionX;
        this.y -=this.directionY;
        //will check if particles is touching edge that will change its diection
        if(this.x - this.size < 0 || this.x + this.size > canvas.width ){
            this.directionX =- this.directionX;
        }
        //will check if particles is touching edge that will change diection
        if(this.y - this.size <0 || this.y + this.size >canvas.height){
            this.directionY = - this.directionY;
        }
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance= Math.sqrt(dx*dx +dy*dy);
        if(distance < this.size + mouse.radius){
            if(this.x <mouse.x && this.x >this.size +10){
                this.x -=10;
            }
            if(this.x > mouse.x && this.x <canvas.width - (this.size +10)){
                this.x +=10;
            }
            if(this.y < mouse.y && this.y > this.size +10 ){
                this.y -=10;
            }
            if(this.y > mouse.y && this.y < canvas.height - (this.size  +10)){
                this.y += 10;
            }
        
        }

    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle =`#00ffff`;
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();

    }
}
//will create instance of particle and add them in particles array
//puch into array
const init = () => {
    arr =[];
    let noOfParticle =(canvas.width * canvas.height)/3000;
    for(let i=0; i<noOfParticle; i++){
        arr.push(new particle());

    }
}
//clear screen before drawing our particles again 
init();
const animate = () =>{
    let lineOpacity =0
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i =0; i<arr.length; i++){
        //to draw line between two particles
        //create nested for loop for animate()function 
        //distance we will use formula of coordinate geometry
        for(let j=i; j<arr.length;j++){
            let dx = arr[j].x -arr[i].x;
            let dy = arr[j].y - arr[i].y;
            let distance = Math.sqrt(dx*dx +dy*dy);
            lineOpacity = 1- distance/100;
            //if it is less than 100 draw a line 
             if(distance <100){
                 ctx.beginPath();
                 ctx.lineWidth = 2;
                 ctx.strokeStyle=`rgba(0,255,255 ,${lineOpacity})`;
                 ctx.moveTo(arr[j].x,arr[j].y);
                 ctx.lineTo(arr[i].x,arr[i].y);
                 ctx.stroke();

             }
        }
        arr[i].update();
        arr[i].draw();

    }
    //tell the browser to call animate function everytime 60 seconds
    requestAnimationFrame(animate);

}
//update canvas width and height 
animate();
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height=window.innerHeight;
    init();

})
canvas.addEventListener("mousemove" , (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

canvas.addEventListener("mouseout" , ()=>{
    mouse.x = undefined;
    mouse.y = undefined;

})