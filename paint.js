"use strict"
class paint {
    constructor(){
        this.canvas = document.getElementById('board');
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.context = this.canvas.getContext('2d');
        this.color = '#ff0000';
        this.tool = 'brush'; // circle, rect, line
        this.lineWidth = 5;
        this.image = [];
        this.drawBackGround();  
        this.beginLine = false;

        this.currentPos = {
            x: 0,
            y: 0
        }

        this.drawing = false;
        
        
        

        
        //listen mouse event
        this.listenEvent();

        this.drawLine(10, 10, 100, 100);
    }

    getMousePos(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    mousedown(event) {
        let mousePos = this.getMousePos(event);
        this.drawing = true;
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(mousePos.x, mousePos.y, this.lineWidth/2, 0, Math.PI * 2, false);        
        this.context.fill();
        this.context.closePath();
        console.log("click down");
        var vit = document.getElementById('info');
        vit.innerHTML = this.drawing;
    }

    mousemove(event) {
        let mousePosMove = this.getMousePos(event);
        if(this.drawing){
            this.drawLine(this.currentPos, mousePosMove);            
        }
        this.currentPos = mousePosMove;
        console.log("on click");
    }

    mouseup(event) {
        this.drawing = false;
               
        console.log("click up");  
        this.image.push(new Image);
        this.image[this.image.length-1].src = this.canvas.toDataURL("image/bmp", 1.0);          
        if(this.beginLine){
            this.context.closePath(); 
        }   
        var vit2 = document.getElementById('info');     
        vit2.innerHTML = this.drawing;
          
    }


    listenEvent() {
        this.canvas.addEventListener(
            'mousedown', 
            (event) => this.mousedown(event)); 
        this.canvas.addEventListener(
            'mousemove', 
            (event) => this.mousemove(event));   
        this.canvas.addEventListener(
            'mouseup', 
            (event) => this.mouseup(event));         
    }

    drawBackGround(){
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, 1200, 800);
        let backGround = this.canvas.toDataURL("image/bmp", 1.0);
        this.image.push(new Image);
        this.image[0].src = backGround;

    }
    drawLine(startPos, endPos){
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.beginLine = true;
        this.context.moveTo(startPos.x, startPos.y);
        this.context.lineTo(endPos.x, endPos.y);
        this.context.stroke();
    }

    undo(){
        if(this.image.length>1){    
            this.image.pop();        
            let oldPic = this.image[this.image.length-1]
            this.context.drawImage(oldPic, 0, 0, 1200, 800);
        }  
    }

    drawCurrent(){
        document.body.appendChild(this.image[0]);
        document.body.appendChild(this.image[1]);
    }
}

var p = new paint();