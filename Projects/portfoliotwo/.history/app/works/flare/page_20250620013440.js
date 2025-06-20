"use client"

import styles from "./flare.module.css"
import ProjectHero from "@/components/templates/projectHero/page"
import SectionOne from "@/components/templates/SectionOne/page"
import SectionTwo from "@/components/templates/SectionTwo/page"
import SectionThree from "@/components/templates/SectionThree/page"
import SectionFour from "@/components/templates/SectionFour/page"
import SectionFive from "@/components/templates/SectionFive/page"
import SectionSix from "@/components/templates/SectionSix/page"
import SectionSeven from "@/components/templates/SectionSeven/page"
import SectionEight from "@/components/templates/SectionEight/page"
import dynamic from "next/dynamic";
import logoAnimation from "/public/media/flare/LogoAnimation.json";



const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Flare({}) {
    return (
        <div className="container">
            <ProjectHero 
                projectName="Flare"
                projectRole="Marketer"
                date="2024"
                imageSrc="/media/flare/MockupPhoneFlareCropped.webp"
                toolsUsed="Adobe Illustrator / Adobe InDesign / After Effects / Figma / React.js"
                textColour="var(--black)"
                mediaWidth="80%"
            />
            <SectionOne 
                paragraphTitleText="Your BC wildfire safety app with weather updates, fire alerts, and related news all into one intuitive app."
            />
            <SectionThree 
                buttons={[
                    {
                        text: "VISIT",
                        icon: "arrow",
                        externalLink: "https://www.flare-bc.com/"
                    },
                    {
                        text: "SOURCE CODE",
                        icon: "github",
                        externalLink: "https://github.com/BCITKevin/Flare_IDSP"
                    },
                    {
                        text: "WIREFRAME",
                        icon: "figma",
                        externalLink: "https://www.figma.com/design/gPHPwANNCgyHX811XBko9g/Flare-Mockup?node-id=1291-5525&t=GMtl9kkT22wD2mLD-1"
                    }
                ]}
            
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
            <SectionSeven
                challengeHeader = "Competitive Analysis"
                challengeParagraph = "Before starting any design work, an in-depth Competitive Analysis Matrix was created to strategically position the app in the disaster prevention and mitigation market. Competitors were evaluated across five key factors: user experience, design and layout, features, technical implementation, and marketing platforms, guiding a more informed and differentiated approach."
            />
            <section className="sectionContainer">
                <SectionFive 
                    challengeHeader = "Our Users"
                    challengeParagraph = "User research for Flare revealed the difficulties residents, travelers, and rural communities face during wildfires, including unclear evacuation notices, misinformation, and limited access to resources. Studies on wildfire evacuation and human behavior during crises highlighted the need for real-time alerts, guided safety tips, and offline functionality to support users in high-stress situations. Insights from past wildfire events reinforced the importance of clear, accessible information to help individuals make informed decisions quickly and stay safe."
                />
                <SectionEight
                    imageOne="/media/flare/flarePersona1.webp"
                    imageTwo="/media/flare/flarePersona2.webp"
                />
            </section>
            <SectionTwo 
                sectionHeading="User Flow"
                imageSrc="/media/flare/userStoryMap.png"
            />
            <section className="sectionContainer">
                <SectionFive 
                    challengeHeader = "Flare Sitemap"
                    challengeParagraph = "The Flare app sitemap organizes essential wildfire safety features into a clear, structured layout. The homepage provides quick access to the apps most important features such as wildfire levels, weather updates, safety and news. The news section aggregates wildfire reports, while the map section includes fire bans, weather forecasts, and fire risk data. The safety section offers preparation and emergency guides alongside an AI chatbot for wildfire-related inquiries. These features provide critical information and guidance, ensuring users can quickly access essential wildfire data and safety resources in an emergency."
                />
                <SectionTwo 
                    imageSrc="/media/flare/flareSitemap.png"
                />
            </section>
            <SectionTwo
                sectionHeading = "Styleguide"
                imageSrc="/media/flare/FlareStyleguide.png"
                mediaWidth="60vw"
            />
            <SectionSix 
                challengeHeader = "Design Process"
                challengeParagraph = "A team of four designers was responsible for creating high-fidelity Figma mockups for each page, along with the logos, branding, and style guide. A dynamic, component-based design system was chosen, utilizing the shadcn/ui component library to serve as a UI library for the three developers. By considering this component library during the design process, the transition from design to code was streamlined, ensuring efficient implementation and consistency across the app."

                buttons={[
                    {
                        text: "WIREFRAME",
                        icon: "figma",
                        externalLink: "https://www.figma.com/design/gPHPwANNCgyHX811XBko9g/Flare-Mockup?node-id=1291-5525&t=GMtl9kkT22wD2mLD-1"
                    }]}

                imageOne = "/media/flare/MockupPhoneMap.png"
                imageTwo = "/media/flare/MockupPhoneNews.png"
                imageThree = "/media/flare/MockupPhoneSafety.png"
            />
            <SectionSeven
                challengeHeader = "User Testing"
                challengeParagraph = "User tests were conducted during the HiFi and LoFi mockup stages, as well as throughout the coding process. Weekly sprints and user testing for all five website pages ensured continuous refinement and improvement. These one-week sprints enabled rapid iteration based on feedback, aligning the designs with project goals while enhancing usability and functionality with each cycle."
                solutionHeader="Navigation Architecture"
                solutionParagraph="Structuring the site content in a clear and logical way was crucial to improving the user experience. The result is a carefully designed navigation system that enables users to quickly access any of the three features, ensuring ease of use when they need it most."
            />
            <SectionOne 
                paragraphTitleText="To highlight the final product, a range of marketing materials was produced."
            />
            <SectionTwo 
                sectionHeading="Promotional Video"
                videoSrc="/media/flare/FlarePromoVideo.mp4"
                initialMute={false}
                mediaWidth="60vw"
            />
            <section className="sectionContainer">
                <SectionEight 
                    sectionHeading="Brochure & Business Card"
                    imageOne="/media/flare/FlareTriFold.png"
                    imageTwo="/media/flare/FlareTriFold2.png"
                />
                <SectionTwo
                    imageSrc="/media/flare/MockupBusinessCardCropped.png"
                    mediaWidth="80vw"
                />
            </section>

            <SectionEight 
                sectionHeading="Team"
                videoOne="/media/flare/FlareTechDemo.mp4"
                imageTwo="/media/flare/FlareTeam.png"
            />
        </div>
    )
}