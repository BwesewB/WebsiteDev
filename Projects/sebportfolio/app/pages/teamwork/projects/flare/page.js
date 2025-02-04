"use client"

import styles from "./flare.module.css"
import ProjectHero from "@/app/components/projectTemplates/projectHero/page"
import SectionOne from "@/app/components/projectTemplates/SectionOne/page"
import SectionTwo from "@/app/components/projectTemplates/SectionTwo/page"
import SectionThree from "@/app/components/projectTemplates/SectionThree/page"
import SectionFour from "@/app/components/projectTemplates/SectionFour/page"
import SectionFive from "@/app/components/projectTemplates/SectionFive/page"
import SectionSix from "@/app/components/projectTemplates/SectionSix/page"
import dynamic from "next/dynamic";
import logoAnimation from "/public/media/flare/LogoAnimation.json";


const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Flare({}) {
    return (
        <div className="container">
            <ProjectHero 
                projectName="Flare"
                projectRole="UI/UX Designer and Marketer"
                date="2024"
                imageSrc="/media/flare/MockupPhoneFlareCropped.png"
                toolsUsed="Adobe Illustrator / Adobe InDesign / After Effects / Figma / React.js"
                textColour="var(--black)"
                mediaWidth="80%"
            />
            <SectionOne 
                paragraphTitleText="Your BC wildfire safety app with weather updates, fire alerts, and related news all into one intuitive app."
            />
            <SectionThree 
                externalLinkVisit = "https://www.flare-bc.com/"
                externalLinkCode = "https://github.com/BCITKevin/Flare_IDSP"
                externalLinkFigma = "https://www.figma.com/design/gPHPwANNCgyHX811XBko9g/Flare-Mockup?node-id=1291-5525&t=GMtl9kkT22wD2mLD-1"
            
                challengeHeader = "The Rising Danger of Wildfires"
                challengeParagraph = "British Columbia is facing increasingly severe wildfire seasons due to climate change and prolonged droughts, not only affecting outdoor enthusiasts, but more importantly rural communities with limited access to timely information. "
                solutionHeader = "How Flare Makes a Difference"
                solutionParagraph = "Flare provides users with a quick and accessible answer to address concerns about wildfires. Wildfires can have devastating impacts on remote areas, cutting off access to critical information and emergency services. Flare bridges this gap by providing real-time, reliable wildfire alerts, even for those living in isolated regions with limited access to traditional media or wildfire updates."
            />
            <div className={styles.fullWidth}>
                <div style={{ width:"100%" }}>
                    <Lottie
                        animationData={logoAnimation}
                        loop={true}
                    />
                </div>
            </div>
            <SectionFive 
                challengeHeader="Competitive Analysis"
                challengeParagraph="Before starting any design work, an in-depth Competitive Analysis Matrix was created to strategically position the app in the disaster prevention and mitigation market. Competitors were evaluated across five key factors: user experience, design and layout, features, technical implementation, and marketing platforms, guiding a more informed and differentiated approach"
            />
            <SectionSix 
                challengeHeader="Design Process"
                challengeParagraph="Our team of "
            />
            <SectionFive 
                challengeHeader="User Testing"
                challengeParagraph=""
            />
        </div>
    )
}