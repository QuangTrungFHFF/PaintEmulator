"use strict"
class paint {
    constructor(){
        this.canvas = document.getElementById('board');
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.context = this.canvas.getContext('2d');
        this.color = '#ff0000';
        this.tool = 'pen'; // circle, rect, line
        this.lineWidth = 5;  

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
        this.context.fillStyle = this.color;
        this.context.arc(mousePos.x, mousePos.y, this.lineWidth/2, 0, Math.PI * 2, false);        
        this.context.fill();
        console.log("click down");
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
        this.context.closePath();
        console.log("click up");
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

    drawLine(startPos, endPos){
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.context.moveTo(startPos.x, startPos.y);
        this.context.lineTo(endPos.x, endPos.y);
        this.context.stroke();
    }
}

var p = new paint();