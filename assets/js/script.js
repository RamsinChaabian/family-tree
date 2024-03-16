document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('tree');
    
let scale = 1;

function handleResize() {
    scale = 0.52;
    container.style.transform = `scale(${scale})`;

    var treeRect = document.getElementById('tree').getBoundingClientRect();

    window.scrollTo({
        left: treeRect.x+400,
        behavior: 'smooth'
    });
    
}


function handleWheel(event) {
    event.preventDefault();

    const delta = Math.max(-1, Math.min(1, event.deltaY));
    const scaleFactor = 0.1;

    // Adjust the scale factor based on the delta
    const newScale = scale * (1 - delta * scaleFactor);

    // Limit the scale factor within desired bounds
    scale = Math.min(Math.max(0.4, newScale), 1);

    // Apply the new scale
    container.style.transform = `scale(${scale})`;
   
}

handleResize();

window.addEventListener('resize', handleResize);
container.addEventListener('wheel', handleWheel);








    var closeIcon = document.querySelector('.close-icon');
    var footer = document.querySelector('footer');

    closeIcon.addEventListener('click', function() {
        footer.classList.toggle('footer-hidden');
    });

});
