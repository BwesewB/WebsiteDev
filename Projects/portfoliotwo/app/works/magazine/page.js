import styles from "./magazine.module.css"
import SectionFive from "../../../../components/templates/SectionFive/page"
import ProjectHero from "../../../../components/templates/projectHero/page"
import SectionOne from "../../../../components/templates/SectionOne/page"
import SectionTwo from "../../../../components/templates/SectionTwo/page"
import SectionThree from "@/components/templates/SectionThree/page"

export default function MagazinePage({}) {
    const mediaWidth = "90%"
    return(
        <div className="container">
            <ProjectHero 
                projectName="Reimagining Spaces"
                date="2024"
                imageSrc="/media/magazine/Toilet1.webp"
                toolsUsed="Adobe Photoshop / Adobe InDesign"
            />
            <SectionOne 
                paragraphTitleText="A Casa Brutus and Popeyes-insipired magazine that explores the interaction between Japanese design and its environment"
            />
            <SectionThree 
                externalLinkVisit = "/media/magazine/ReimaginingSpaces.pdf"
                visit = "Web PDF"
            
                challengeHeader = "Reimagining Spaces: A Japanese Perspective"
                challengeParagraph = "Spaces are not just containers for life—they shape behaviors, perceptions, and the way people connect with their surroundings. Japanese design, with its emphasis on adaptability, materiality, and spatial flow, offers a unique perspective on how environments can be structured and experienced. This printed magazine considers how contemporary Japanese spaces respond to limitations, integrate practicality with aesthetic intent, and challenge conventional spatial boundaries."
            />
            <section className="sectionContainer">
                <SectionTwo
                    imageSrc="/media/magazine/MockupMagazine1.webp"
                    mediaWidth={mediaWidth}
                />
                <SectionTwo
                    imageSrc="/media/magazine/MockupMagazine2.webp"
                    mediaWidth={mediaWidth}
                />
                <SectionTwo
                    imageSrc="/media/magazine/MockupMagazine3.webp"
                    mediaWidth={mediaWidth}
                />
                <SectionTwo
                    imageSrc="/media/magazine/MockupMagazine4.webp"
                    mediaWidth={mediaWidth}
                />
                <SectionTwo
                    imageSrc="/media/magazine/MockupMagazine5.webp"
                    mediaWidth={mediaWidth}
                />
                <SectionTwo
                    imageSrc="/media/magazine/MockupMagazine6.webp"
                    mediaWidth={mediaWidth}
                />
                <SectionTwo
                    imageSrc="/media/magazine/MockupMagazine7.webp"
                    mediaWidth={mediaWidth}
                />
            </section>

            {/* <div className={styles.fullWidth}>
                <div style={{width:"60%"}}>
                    <SectionTwo
                        imageSrc="/media/logo/LogoDiameter.png"
                    />
                </div>
            </div>
            <SectionFive 
                challengeHeader="The Logo"
                challengeParagraph="The logo depicts a fugu, or pufferfish, chosen for its connection to craft and precision. Drawing inspiration from a passion for Japanese fish cutting, the design reflects the same focus and care required to handle this delicacy, representing a thoughtful and careful approach to creating work with attention to detail."
            />
            <div className={styles.fullWidth}>
                <div style={{width:"50%"}}>
                    <SectionTwo
                        imageSrc="/media/logo/LogoMeasurement.png"
                    />
                </div>
            </div>
            <SectionTwo
                imageSrc="/media/logo/LogoCreation.png"
            /> */}
        </div>
    )
}