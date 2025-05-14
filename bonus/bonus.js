export function move(i,width, progress,) {
    console.log(width);
    if (i == 0) {
        i = 1;
        const elem = document.getElementById("myBar");
        const id = setInterval(frame, 10);
        function frame() {
            if (width >= progress) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }  
        }   
    }
}

export function preced() {
    console.log("object");
}