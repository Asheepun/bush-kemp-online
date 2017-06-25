let pointer;

function initializePointer(canvas, offSet){
    pointer = {
        pos: v(0, 0),
        down: false,
        canvas: canvas,
    }
    if(canvas != undefined && offSet != undefined){
        c.addEventListener("mousemove", e => {
            let point = getPointerCanvasPos(pointer.canvas, e);
            pointer.pos.x = point.x - offSet.x;
            pointer.pos.y = point.y - offSet.y;
        });
        c.addEventListener("mousedown", e => {
            pointer.down = true;
        });
        c.addEventListener("mouseup", e => {
            pointer.down = false;
        });
    }

    function getPointerCanvasPos(canvas, e){
        let rect = canvas.getBoundingClientRect();
        return {
            x: e.pageX - rect.left,
            y: e.pageY - rect.top,
        }
    }
}