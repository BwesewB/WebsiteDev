import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);

    CustomEase.create(
        "hop", 
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1 "
    );

    const clientPreview = document.querySelector(".clients-preview");
    const clientNames = document.querySelectorAll(".client-name");

    let activeClientIndex = -1; // No active client initially

    clientNames.forEach((clientName, index) => {
        let activeClientImgWrapper = null;
        let activeClientImg = null;

        clientName.addEventListener("mouseover", () => {
            if (activeClientIndex === index) return; // Already active

            if (activeClientIndex !== -1) {
                const previousClientName = clientNames[activeClientIndex];
                const mouseoutEvent = new Event("mouseout");
                previousClientName.dispatchEvent(mouseoutEvent);
            }

            activeClientIndex = index;

            const clientImgWrapper = document.createElement("div");
            clientImgWrapper.className = "client-img-wrapper";

            const clientImg = document.createElement("img");
            clientImg.src = `img${index + 1}.jpg`;
            gsap.set(clientImg, { scale: 1.25, opacity: 0 });

            clientImgWrapper.appendChild(clientImg);
            clientPreview.appendChild(clientImgWrapper);

            activeClientImgWrapper = clientImgWrapper;
            activeClientImg = clientImg;

            gsap.to(clientImgWrapper, { 
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.5, 
                ease: "hop",
            });
        });

    })
});