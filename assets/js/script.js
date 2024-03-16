document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('tree');
    
let scale = 1;
let initialScale = 1;
let touchStartDistance = 0;

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

// Listen for touch start event
document.addEventListener('touchstart', function(event) {
    if (event.touches.length === 2) {
        // Calculate the distance between two fingers
        touchStartDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        initialScale = scale;
    }
});

// Listen for touch move event
document.addEventListener('touchmove', function(event) {
    if (event.touches.length === 2) {
        // Calculate the distance between two fingers during move
        const touchMoveDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        
        // Calculate the new scale based on the initial scale and the ratio of start distance to move distance
        const newScale = initialScale * (touchMoveDistance / touchStartDistance);

        // Limit the scale factor within desired bounds
        scale = Math.min(Math.max(0.4, newScale), 3);

        // Apply the new scale
        container.style.transform = `scale(${scale})`;

        event.preventDefault(); // Prevent default pinch-to-zoom behavior
    }
});

handleResize();

window.addEventListener('resize', handleResize);
container.addEventListener('wheel', handleWheel);

    var closeIcon = document.querySelector('.close-icon');
    var footer = document.querySelector('footer');

    closeIcon.addEventListener('click', function() {
        footer.classList.toggle('footer-hidden');
    });

});
