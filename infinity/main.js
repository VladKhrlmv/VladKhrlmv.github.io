document.addEventListener("mousemove", function(e){
    var body = document.querySelector('body');
    var bubbles = document.createElement('span');
    var x = e.offsetX;
    var y = e.offsetY;
    var size = Math.random() * 100;
    
    bubbles.style.left = x + 'px';
    bubbles.style.top = y + 'px';

    bubbles.style.width = 20 + size + 'px';
    bubbles.style.height = 20 + size + 'px';
    bubbles.style.backgroundImage = `url('${Math.ceil(Math.random() * 10)}.png')`;

    body.appendChild(bubbles);

    setTimeout(function(){
        bubbles.remove();
    }, 4000);
})