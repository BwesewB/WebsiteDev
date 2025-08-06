import InteractiveCanScene from "@/components/molecules/InteractiveCan/InteractiveCan";
import CitadelImage from '/public/media/citadel/gate.webp';
import MagazineImage from '/public/media/magazine/Toilet1.webp';

export const cardData = [
    {
        title: "Decked Beer",
        customComponent: <InteractiveCanScene/>, 
        categories: ["Blender", "Illustrator", "Photoshop", "Three.js", "GSAP"],
        projectLink: "/works/deckedBeer/",
        scale: 1,
        startingScale: 1,
        movementFactor: 0,
    },
    {
        title: "Black Hole",
        src: "/media/blackHole/Clip1.mp4",
        categories: ["After Effects", "Illustrator", "GSAP", "Figma"],
        projectLink: "/works/blackHole/"
    },
    {
        title: "Flare",
        src: "/media/flare/FlareLogoAnime.mp4",
        categories: ["Illustrator", "InDesign", "After Effects", "Figma", "Lottie"],
        projectLink: "/works/flare/"
    },
    {
        title: "Citadel",
        src: CitadelImage,
        categories: ["After Effects", "Shapr 3D", "Blender", "Photoshop"],
        projectLink: "/works/citadel/"
    },
    {
        title: "Reimagining Spaces",
        src: MagazineImage ,
        categories: ["InDesign", "Photoshop"],
        projectLink: "/works/magazine/"
    },
    {
        title: "Taxes",
        src: "/media/taxes/AvoidTaxesClip.mp4",
        categories: ["After Effects"],
        projectLink: "/works/taxes/"
    },
];
