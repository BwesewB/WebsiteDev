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
    if (activeClientIndex === index) return;

    // kill any running tweens on the current active media/wrapper
    if (activeClientImg) gsap.killTweensOf(activeClientImg);
    if (activeClientImgWrapper) gsap.killTweensOf(activeClientImgWrapper);

    // capture old references BEFORE changing globals
    const oldWrapper = activeClientImgWrapper;
    const oldMedia = activeClientImg;

    // fade out + remove old preview safely
    if (oldWrapper && oldMedia) {
      gsap.to(oldMedia, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          oldWrapper.remove();
        },
      });
    }

    activeClientIndex = index;

    const clientImgWrapper = document.createElement("div");
    clientImgWrapper.className = "client-img-wrapper";

    const assetName = assets[index] || "";
    const mediaEl = assetName ? createMediaElement(assetName) : document.createElement("div");

    clientImgWrapper.appendChild(mediaEl);
    clientPreview.appendChild(clientImgWrapper);

    // set globals AFTER new is created
    activeClientImgWrapper = clientImgWrapper;
    activeClientImg = mediaEl;

    gsap.set(clientImgWrapper, {
      clipPath: "inset(50% 50% 50% 50%);",
    });
    gsap.set(mediaEl, { scale: 1.25 });

    gsap.to(clientImgWrapper, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.5,
      ease: "hop",
    });

    gsap.to(mediaEl, {
      scale: 1,
      duration: 1.25,
      ease: "power2.out",
    });
  });

  clientName.addEventListener("mouseleave", () => {
    if (activeClientIndex !== index) return;

    // capture current references
    const wrapperToRemove = activeClientImgWrapper;
    const mediaToFade = activeClientImg;

    activeClientIndex = -1;
    activeClientImgWrapper = null;
    activeClientImg = null;

    if (!wrapperToRemove || !mediaToFade) return;

    gsap.killTweensOf(mediaToFade);
    gsap.to(mediaToFade, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        wrapperToRemove.remove();
      },
    });
  });
});

});