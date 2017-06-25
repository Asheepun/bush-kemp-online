let keys; 

function initializeKeyboard(){
    keys = {
        w: {down: false},
        a: {down: false},
        s: {down: false},
        d: {down: false},
        esc: {down: false},
        shift: {down: false},
    }

    document.addEventListener("keydown", e => {keyHandler(e, true)});
    document.addEventListener("keyup", e => {keyHandler(e, false)});

    function keyHandler(e, down){
        switch(e.keyCode){
            case 87:
                keys.w.down = down;
                break;
            case 83:
                keys.s.down = down;
                break;
            case 65:
                keys.a.down = down;
                break;
            case 68:
                keys.d.down = down;
                break;
            case 16:
                keys.shift.down = down;
                break;
            case 27:
                keys.esc.down = down;
                break;
        }
    }
}

function toggleFullscreen(element){
    if(!(screen.width == window.innerWidth && screen.height == window.innerHeight)){
                let rfs = element.webkitRequestFullscreen
                      ||  element.mozRequestFullscreen
                      ||  element.msRequestFullscreen;
                rfs.call(element);
            }
            else {
                let efs = document.webkitExitFullscreen
                       || document.mozCancelFullscreen
                       || document.msRequestFullscreen;
                efs.call(document);
            }
}