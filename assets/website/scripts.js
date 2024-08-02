document.querySelector('.navbar-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('sidebar-show');
    document.querySelector('.sidebar-backdrop').classList.toggle('sidebar-backdrop-show');
});

document.querySelectorAll('.sidebar-backdrop, nav a').forEach((el) => {
    el.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.remove('sidebar-show');
        document.querySelector('.sidebar-backdrop').classList.remove('sidebar-backdrop-show');
    });
})

document.querySelectorAll('.block img').forEach((el) => {
    el.addEventListener('click', function() {
        document.querySelector('.image-overlay img').src = el.src;
        document.querySelector('.image-overlay').classList.add('image-overlay-show');
    });
});

document.querySelector('.image-overlay-backdrop').addEventListener('click', function() {
    document.querySelector('.image-overlay').classList.remove('image-overlay-show');
});