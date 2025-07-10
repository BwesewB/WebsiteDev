import ProjectCard from "@/components/templates/projectCard/projectCard";
import InteractiveCanScene from "@/components/molecules/InteractiveCan/InteractiveCan";

export const cardData = [
    {
        title: "Decked Beer",
        // customComponent: <ProjectCard><InteractiveCanScene/></ProjectCard>, 
        customComponent: <InteractiveCanScene/>, 
        categories: ["motion", "3D", "branding"],
        projectLink: "/works/deckedBeer/",
        scale: 1,
        movementFactor: 0,
    },
    {
        title: "Black Hole",
        src: "/media/blackHole/Clip1.mp4",
        categories: [""],
        projectLink: "/works/blackHole/"
    },
    {
        title: "Flare",
        src: "/media/flare/FlareLogoAnime.mp4",
        categories: [""],
        projectLink: "/works/flare/"
    },
    {
        title: "Citadel",
        src: "/media/citadel/gate.webp",
        categories: ["3D"],
        projectLink: "/works/citadel/"
    },
    {
        title: "Reimagining Spaces",
        src: "/media/magazine/Toilet1.webp",
        categories: ["InDesign", "Photoshop"],
        projectLink: "/works/magazine/"
    },
];
