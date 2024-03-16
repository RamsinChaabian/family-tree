document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('tree');

    let scale = 1;
    let initialScale = 1;
    let touchStartDistance = 0;
    var treeRect = document.getElementById('tree').getBoundingClientRect();
    
    let isZooming = false;
    
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
    
       
        isZooming = true;
        setTimeout(() => {
            isZooming = false;
        }, 300); 
    }
    
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length === 2) {
            touchStartDistance = Math.hypot(
                event.touches[0].clientX - event.touches[1].clientX,
                event.touches[0].clientY - event.touches[1].clientY
            );
            initialScale = scale;
        }
    });
    
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    
        if (event.touches.length === 2) {
            const touchMoveDistance = Math.hypot(
                event.touches[0].clientX - event.touches[1].clientX,
                event.touches[0].clientY - event.touches[1].clientY
            );
            
            const newScale = initialScale * (touchMoveDistance / touchStartDistance);
    
            scale = Math.min(Math.max(0.4, newScale), 1);
    
            container.style.transform = `scale(${scale})`;
    
            isZooming = true;
            setTimeout(() => {
                isZooming = false;
            }, 300);
        }
    });
     
    window.addEventListener('scroll', function() {
        if (!isZooming) {
            window.scrollTo({
                left: treeRect.x + 400,
                behavior: 'smooth'
            });
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
