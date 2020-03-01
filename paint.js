"use strict"
class paint {
    constructor() {
        this.canvas = document.getElementById('board');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext('2d');
        this.color = '#ff0000';
        this.tool = 'brush'; // circle, rect, line
        this.lineWidth = 5;
        this.image = [];
        this.fixedImg = null;
        this.fixedSpot = null;
        this.drawBackGround();
        this.beginLine = false;

        this.currentPos = {
            x: 0,
            y: 0
        }

        this.drawing = false;

        //listen mouse event
        this.listenEvent();
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
        this.context.arc(mousePos.x, mousePos.y, this.lineWidth / 2, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.closePath();

        if(this.tool == 'line'){
            this.fixedImg = new Image;
            this.fixedImg.src = this.canvas.toDataURL("image/bmp", 1.0);
            this.fixedSpot = this.getMousePos(event);
        }
        //console.log("click down");

    }

    mousemove(event) {
        let mousePosMove = this.getMousePos(event);
        if (this.drawing) {
            switch (this.tool) {
                case 'brush':
                    this.drawLine(this.currentPos, mousePosMove);
                    break;
                case 'line':
                    this.undoForLine();
                    this.drawLine(this.fixedSpot, mousePosMove);
                    break;
            }
        }
        this.currentPos = mousePosMove;
        //console.log("on click");
    }

    mouseup(event) {
        this.drawing = false;

        this.image.push(new Image);
        if (this.image.length > 10) {
            this.image.splice(0, 1);
        }
        this.image[this.image.length - 1].src = this.canvas.toDataURL("image/bmp", 1.0);
        if (this.beginLine) {
            this.context.closePath();
        }

        /*var vit2 = document.getElementById('info');     
        vit2.innerHTML = this.drawing;*/

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

    drawBackGround() {
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, 800, 600);
        let backGround = this.canvas.toDataURL("image/bmp", 1.0);
        this.image.push(new Image);
        this.image[0].src = backGround;

    }
    drawLine(startPos, endPos) {
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.beginLine = true;
        this.context.moveTo(startPos.x, startPos.y);
        this.context.lineTo(endPos.x, endPos.y);
        this.context.stroke();
    }

    undo() {
        if (this.image.length > 1) {
            this.image.pop();
            let oldPic = this.image[this.image.length - 1];
            this.context.drawImage(oldPic, 0, 0, 800, 600);
        }
    }

    undoForLine() {
        let fixedImage = this.fixedImg;
        this.context.drawImage(fixedImage, 0, 0, 800, 600);
    }

    clear() {
        console.log('a');
        this.image = [];
        this.drawBackGround();
        console.log('a');
    }
}

var p = new paint();