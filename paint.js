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

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    mousedown(event) {
        let mousePos = this.getMousePos(event);
        console.log("click");
    }

    mousemove(event) {
        console.log("click");
    }

    mouseup(event) {
        console.log("click");
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

    drawLine(startX, startY, endX, endY){
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.stroke();


    }
}

var p = new paint();