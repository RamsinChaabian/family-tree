document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('tree');
    var closeIcon = document.querySelector('.close-icon');
    var footer = document.querySelector('footer');
    var treeRect = container.getBoundingClientRect();
    
    let scale = 1;
    let initialScale = 1;
    let touchStartDistance = 0;

    function handleResize() {
        scale = 0.52;
        container.style.transform = `scale(${scale})`;
    
        window.scrollTo({
            left: treeRect.x + 1200,
            behavior: 'smooth'
        });
    }

    function handleWheel(event) {
        event.preventDefault();

        const delta = Math.max(-1, Math.min(1, event.deltaY));
        const scaleFactor = 0.1;

        const newScale = scale * (1 - delta * scaleFactor);
        scale = Math.min(Math.max(0.4, newScale), 1);
        container.style.transform = `scale(${scale})`;
    }

    function handleTouch(event) {
        if (event.touches.length === 2) {
            event.preventDefault();

            if (event.type === 'touchstart') {
                touchStartDistance = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                );
                initialScale = scale;
            } else if (event.type === 'touchmove') {
                const touchMoveDistance = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                );
                const newScale = initialScale * (touchMoveDistance / touchStartDistance);
                scale = Math.min(Math.max(0.4, newScale), 1);
                container.style.transform = `scale(${scale})`;

                if (Math.abs(newScale - initialScale) > 0.05) {
                    const scrollAdjustment = (treeRect.x + 400) * (newScale - initialScale);
                    initialScale = newScale;
                    window.scrollTo({
                        left: window.pageXOffset + scrollAdjustment,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }

    handleResize();
    window.addEventListener('resize', debounce(handleResize, 100));
    container.addEventListener('wheel', handleWheel);
    document.addEventListener('touchstart', handleTouch);
    document.addEventListener('touchmove', handleTouch);

    closeIcon.addEventListener('click', function() {
        footer.classList.toggle('footer-hidden');
    });

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});