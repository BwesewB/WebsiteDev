const assets = [
    'Clip1.mp4',
    'citadelVideo.mp4',
    'fishCanVideo.mp4',
    'ChalkAnimation.mp4',
    'Oblik.png',
    'Toilet1.webp',
    'Render6.png',
    'AvoidTaxesClip.mp4'
];

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);

    CustomEase.create(
        "hop", 
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1 "
    );

    const clientPreview = document.querySelector(".clients-preview");
    const clientNames = document.querySelectorAll(".client-name");

    let activeClientIndex = -1; // No active client initially

    function createMediaElement(path) {
        const ext = path.split('.').pop().toLowerCase();
        const imageExts = ['jpg','jpeg','png','webp','gif','svg'];
        const videoExts = ['mp4','webm','ogg'];

        if (imageExts.includes(ext)) {
            const img = document.createElement('img');
            img.src = `images/${path}`;
            img.alt = '';
            img.loading = 'lazy';
            return img;
        }

        if (videoExts.includes(ext)) {
            const vid = document.createElement('video');
            vid.src = `images/${path}`;
            vid.autoplay = true;
            vid.loop = true;
            vid.muted = true;
            vid.playsInline = true;
            vid.preload = 'auto';
            return vid;
        }

        // fallback: treat as image
        const fallback = document.createElement('img');
        fallback.src = `images/${path}`;
        fallback.alt = '';
        return fallback;
    }

    // single active preview tracked here
    let activeClientImgWrapper = null;
    let activeClientImg = null;

    clientNames.forEach((clientName, index) => {
        clientName.addEventListener("mouseenter", () => {
            if (activeClientIndex === index) return; // already active

            // hide and remove previous preview
            if (activeClientImgWrapper) {
                gsap.to(activeClientImg, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        if (activeClientImgWrapper && activeClientImgWrapper.parentNode) {
                            activeClientImgWrapper.parentNode.removeChild(activeClientImgWrapper);
                        }
                        activeClientImgWrapper = null;
                        activeClientImg = null;
                    }
                });
            }

            activeClientIndex = index;

            const clientImgWrapper = document.createElement("div");
            clientImgWrapper.className = "client-img-wrapper";

            const assetName = assets[index] || '';
            const mediaEl = assetName ? createMediaElement(assetName) : document.createElement('div');

            clientImgWrapper.appendChild(mediaEl);
            clientPreview.appendChild(clientImgWrapper);

            activeClientImgWrapper = clientImgWrapper;
            activeClientImg = mediaEl;

            gsap.set(mediaEl, { scale: 1.25, opacity: 0 });

            gsap.to(clientImgWrapper, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.5,
                ease: "hop",
            });

            gsap.to(mediaEl, {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out",
            });
        });

        clientName.addEventListener("mouseleave", () => {
            if (activeClientIndex !== index) return;
            activeClientIndex = -1;
            if (!activeClientImg) return;
            gsap.to(activeClientImg, {
                opacity: 0,
                duration: 0.25,
                onComplete: () => {
                    if (activeClientImgWrapper && activeClientImgWrapper.parentNode) {
                        activeClientImgWrapper.parentNode.removeChild(activeClientImgWrapper);
                    }
                    activeClientImgWrapper = null;
                    activeClientImg = null;
                }
            });
        });
    });
});