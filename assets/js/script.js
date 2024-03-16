document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('tree');
    
let scale = 1;

function handleResize() {
    scale = 0.52;
    container.style.transform = `scale(${scale})`;

    var treeRect = document.getElementById('tree').getBoundingClientRect();
    console.log(treeRect.x);
    
    window.scrollTo({
        left: treeRect.x+400,
        behavior: 'smooth'
    });
    
}


function handleWheel(event) {
    event.preventDefault();

    const mouseX = event.clientX - container.getBoundingClientRect().left;
    const mouseY = event.clientY - container.getBoundingClientRect().top;

    const delta = Math.max(-1, Math.min(1, event.deltaY));
    const scaleFactor = 0.1;

    // Adjust the scale factor based on the delta
    const newScale = scale * (1 - delta * scaleFactor);

    // Limit the scale factor within desired bounds
    scale = Math.min(Math.max(0.4, newScale), 3);

    // Get the position of the tree element
    const treeRect = document.getElementById('tree').getBoundingClientRect();

    // Calculate the new scroll position to maintain the mouse position
    const newScrollLeft = (container.scrollLeft + mouseX) * (scale / container.style.zoom) - mouseX * (scale / container.style.zoom) - (treeRect.left - container.getBoundingClientRect().left);
    const newScrollTop = (container.scrollTop + mouseY) * (scale / container.style.zoom) - mouseY * (scale / container.style.zoom) - (treeRect.top - container.getBoundingClientRect().top);

    // Apply the new scale
    container.style.transform = `scale(${scale})`;

    // Adjust the scroll position
    container.scrollTo(newScrollLeft, newScrollTop);
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
