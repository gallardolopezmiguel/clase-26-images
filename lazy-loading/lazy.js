const images = [].slice.call(document.querySelectorAll('.dog'));

function lazyLoadPhoto(photo) {
    const lazyImage = new Image();
    lazyImage.classList.add('dog');
    lazyImage.src = photo.dataset.srcSet;
    lazyImage.onload = () => {
        const parent = photo.parentNode;
        parent.replaceChild(lazyImage, photo);
    }
}

if('IntersectionObserver' in window) {
    let imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                let image = entry.target;
                const placeHolderSrc = image.dataset.src;
                image.src = placeHolderSrc;
                imageObserver.unobserve(image);
                setTimeout(() => {
                    lazyLoadPhoto(image);
                },3000);
            }
        });
    });
    images.forEach((image) => {
        imageObserver.observe(image)
    })
}

window.addEventListener('load', function() {
    this.setTimeout(firstLazy, 1000);
});
// with out Observing
function firstLazy() {
    const photo = document.getElementById('first');
    photo.className = 'is-loaded';
}