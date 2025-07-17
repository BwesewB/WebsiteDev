import ProjectHero from "@/components/templates/projectHero/page"
import LargeTextSection from "@/components/templates/LargeTextSection/largeTextSection"
import SectionTwo from "@/components/templates/SectionTwo/page"
import TwoColumnMediaLayout from "@/components/templates/TwoColumnMediaLayout/page"
import LayoutHero from "@/components/templates/LayoutHero/layoutHero"
import LayoutSeven from "@/components/templates/Layout-7/layoutSeven"

export default function MagazinePage({}) {
    const mediaWidth = "90%"
    return(
        <div className="container">
            <LayoutHero 
                title="Reimagining Spaces"
                subHeader="Magazine Layout Design"
                paragraph="Spaces are not just containers for life—they shape behaviors, perceptions, and the way people connect with their surroundings. Japanese design, with its emphasis on adaptability, materiality, and spatial flow, offers a unique perspective on how environments can be structured and experienced. This printed magazine considers how contemporary Japanese spaces respond to limitations, integrate practicality with aesthetic intent, and challenge conventional spatial boundaries."
                // enablePaddingTop={true}
                imageSrc="/media/magazine/Toilet1.webp"
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
                    { imageSrc: "/media/magazine/MockupMagazine1.webp" },
                    { imageSrc: "/media/magazine/MockupMagazine2.webp" },
                    { imageSrc: "/media/magazine/MockupMagazine3.webp" },
                    { imageSrc: "/media/magazine/MockupMagazine4.webp" },
                    { imageSrc: "/media/magazine/MockupMagazine5.webp" },
                    { imageSrc: "/media/magazine/MockupMagazine6.webp" },
                    { imageSrc: "/media/magazine/MockupMagazine7.webp" },
                ]}
                mediaCarouselWidth="110vw"
            />

        </div>
    )
}