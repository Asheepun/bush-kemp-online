function drawArrays(array){
    for(let i = 0; i < array.length; i++){
        array[i].forEach(object => {
            object.draw();
        });
    }
}

function updateArrays(array){
    for(let i = 0; i < array.length; i++){
        array[i].forEach(object => {
            object.update();
        });
    }
}

function spliceArrays(arrays){
    arrays.forEach(array => {
        array.splice(0, array.length);
    });
}

const findIndex = (array, condition) => {
    for(let i = 0; i < array.length; i++){
        if(condition(array[i])){
            return i;
        }else if(i === array.length-1) return false;
    }
} 