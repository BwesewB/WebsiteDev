import LayoutHero from "@/components/templates/LayoutHero/layoutHero"
import LayoutSeven from "@/components/templates/Layout-7/layoutSeven"

import toiletImage from "/public/media/magazine/Toilet1.webp";
import mockupMagazine1 from "/public/media/magazine/MockupMagazine1.webp";
import mockupMagazine2 from "/public/media/magazine/MockupMagazine2.webp";
import mockupMagazine3 from "/public/media/magazine/MockupMagazine3.webp";
import mockupMagazine4 from "/public/media/magazine/MockupMagazine4.webp";
import mockupMagazine5 from "/public/media/magazine/MockupMagazine5.webp";
import mockupMagazine6 from "/public/media/magazine/MockupMagazine6.webp";
import mockupMagazine7 from "/public/media/magazine/MockupMagazine7.webp";

export default function MagazinePage({}) {
    return(
        <div className="container">
            <LayoutHero 
                title="Reimagining Spaces"
                subHeader="Magazine Layout Design"
                paragraph="Spaces are not just containers for life—they shape behaviors, perceptions, and the way people connect with their surroundings. Japanese design, with its emphasis on adaptability, materiality, and spatial flow, offers a unique perspective on how environments can be structured and experienced. This printed magazine considers how contemporary Japanese spaces respond to limitations, integrate practicality with aesthetic intent, and challenge conventional spatial boundaries."
                // enablePaddingTop={true}
                imageSrc={toiletImage}
                buttons={[
                    { 
                        text: "Web PDF", 
                        externalLink: "/media/magazine/ReimaginingSpaces.pdf",
                        icon: "arrow" 
                    },
                ]}
            />
            <LayoutSeven
                header= "A Casa Brutus and Popeyes-insipired magazine that explores the interaction between Japanese design and its environment"
                paragraph= ""
                mediaItems={[
                    { imageSrc: mockupMagazine1 },
                    { imageSrc: mockupMagazine2 },
                    { imageSrc: mockupMagazine3 },
                    { imageSrc: mockupMagazine4 },
                    { imageSrc: mockupMagazine5 },
                    { imageSrc: mockupMagazine6 },
                    { imageSrc: mockupMagazine7 },
                ]}
                mediaCarouselWidth="110vw"
            />

        </div>
    )
}