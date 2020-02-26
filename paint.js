class paint {
    constructor(){
        this.canvas = document.getElementById('board');
        this.context = this.canvas.getContext('2d');
        this.color = '#000000';
        this.tool = 'pen'; // circle, rect, line
        this.lineWidth = 1;  
        
        //listen mouse event
        this.listenEvent();
    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    mousedown() {
        
    }


    listenEvent() {
        this.canvas.addEventListener('mousedown', this.mousedown());
        this.canvas.addEventListener('mousedown', this.mousedown());
    }

    drawLine(startX, startY, endX, endY){

    }
}

var p = new paint();