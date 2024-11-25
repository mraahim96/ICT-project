const cursorDot = document.querySelector('curson-dot');
const cursorOutline = document.querySelector('curson-outline');

window.addEventListener("mousemove",function(e) {

    const posX =e.clientX;
    const posY =e.clientY;

    cursorDot.style.left = '${posX}px';
    cursorDot.style.top = '${posY}px';
    cursorOutline.animate({
        left:'${posX}px',
        top:'${posY}px'
    }, {duration: 500,fill:"forwards"});
})
