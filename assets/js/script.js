document.addEventListener('DOMContentLoaded', function() {
   // Listen for touch move event
document.addEventListener('touchmove', function(event) {
    // Prevent default pinch-to-zoom behavior
    event.preventDefault();

    if (event.touches.length === 2) {
        // Calculate the distance between two fingers during move
        const touchMoveDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        
        // Calculate the new scale based on the initial scale and the ratio of start distance to move distance
        const newScale = initialScale * (touchMoveDistance / touchStartDistance);

        // Limit the scale factor within desired bounds
        scale = Math.min(Math.max(0.4, newScale), 1);

        // Apply the new scale
        container.style.transform = `scale(${scale})`;

        // Adjust scroll position only if significant change in scale
        if (Math.abs(newScale - initialScale) > 0.05) {
            // Calculate relative scroll adjustment based on the change in scale
            const scrollAdjustment = (treeRect.x + 400) * (newScale - initialScale);
            
            // Update the initial scale for future calculations
            initialScale = newScale;

            // Adjust scroll position
            window.scrollTo({
                left: window.pageXOffset + scrollAdjustment,
                behavior: 'smooth'
            });
        }
    }
});


window.addEventListener('resize', handleResize);
container.addEventListener('wheel', handleWheel);

    var closeIcon = document.querySelector('.close-icon');
    var footer = document.querySelector('footer');

    closeIcon.addEventListener('click', function() {
        footer.classList.toggle('footer-hidden');
    });

});
