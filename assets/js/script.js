document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('tree');
    let scale = 0.4;

    function handleResize() {
        container.style.zoom = scale;
    }

    function handleWheel(event) {
        event.preventDefault();
        scale += event.deltaY * -0.1;
        scale = Math.min(Math.max(0.4, scale), 3);
        container.style.zoom = scale;
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    container.addEventListener('wheel', handleWheel);
});
