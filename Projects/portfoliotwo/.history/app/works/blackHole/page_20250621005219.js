import ProjectHero from "@/components/templates/projectHero/page"
import SectionOne from "@/components/templates/SectionOne/page"
import SectionThree from "@/components/templates/SectionThree/page"
import SectionEight from "@/components/templates/SectionEight/page"

export default function blackHole() {
    return (
        <div className="container">
            <ProjectHero 
                projectName="Black Hole"
                date="2023-2024"
                videoSrc="/media/blackHole/RevisedFinal.mp4"
                toolsUsed="Adobe After Effects / Adobe Illustrator / GSAP / Next.js / Figma"
                initialMute={false}
            />
            <SectionOne 
                paragraphTitleText="Black hole is an interactive project that merges custom-designed After Effects assets with a 12-page interactive coded experience."
            />
            <TwoColumnMediaLayout
                textSide="right" // Main textBlocks (Wildfire info) will be on the RIGHT.
                                // mediaColumnItems (the 3 buttons) will be on the LEFT.
                
                textBlocks={[ // This content goes to the RIGHT column
                    { 
                        header: "The Rising Danger of Wildfires", 
                        paragraph: "British Columbia is facing increasingly severe wildfire seasons due to climate change and prolonged droughts, not only affecting outdoor enthusiasts, but more importantly rural communities with limited access to timely information." 
                    },
                    { 
                        header: "How Flare Makes a Difference", 
                        paragraph: "Flare provides users with a quick and accessible answer to address concerns about wildfires. Wildfires can have devastating impacts on remote areas, cutting off access to critical information and emergency services. Flare bridges this gap by providing real-time, reliable wildfire alerts, even for those living in isolated regions with limited access to traditional media or wildfire updates." 
                    }
                ]}

                mediaColumnItems={[ // This content goes to the LEFT column
                    {
                        type: 'buttons', 
                        items: [
                            { text: "VISIT", icon: "arrow", externalLink: "https://black-hole-design-3.vercel.app/" },
                            { text: "SOURCE CODE", icon: "github", externalLink: "https://github.com/BCITKevin/Flare_IDSP" },
                        ]
                    }
                ]}
                
                // NOW, to make the physical LEFT side sticky:
                stickyConfig={{ column: 'left' }} 
                
                textColour="var(--black)"
            />
            <SectionThree 
                buttons={[
                    {
                        text: "VISIT",
                        icon: "arrow",
                        externalLink: "https://black-hole-design-3.vercel.app/"
                    },
                    {
                        text: "SOURCE CODE",
                        icon: "github",
                        externalLink: "https://github.com/BwesewB/Black-Hole-Design-3"
                    }
                ]}

                challengeHeader = "Motion Graphics"
                challengeParagraph = "Time management was crucial for this project. Within ten weeks, ideation, storyboarding, and production were completed. The old film aesthetic was achieved by applying grain, glow, and frame rate reduction through adjustment layers. Minimal graphics were used to maintain focus on animation and transitions, while the absence of color enhanced both the vintage feel and minimalist approach. Design principles such as patterns and scale were emphasized instead of color to demonstrate thoughtful design choices and strong communication throughout the process."
                solutionHeader = "Coded Interactive Website"
                solutionParagraph = "The primary goal was to achieve three key features: smooth video playback, clean GSAP animations, and seamless transitions. To accomplish this, the project was structured using two types of video clips: transition clips and still clips. Transition clips served to smoothly bridge the gap between static scenes, ensuring that when a user clicked the “next” button, the still clip transitioned seamlessly to the next without abrupt cuts. Without these dedicated still clips, the animation would feel disjointed, as users could trigger the next page while a moving animation was still playing, leading to a choppy experience. This strategic planning allowed for a fluid, professional user experience perfectly aligned with the project’s creative vision."
            />
            <SectionEight 
                sectionHeading="Clips from Interactive Website"
                videoOne="/media/blackHole/smallTransform.mp4"
                videoTwo="/media/blackHole/Clip12andReverse.mp4"
                videoThree="/media/blackHole/solarSystem.mp4"
                videoFour="/media/blackHole/scaleVisualizer.mp4"
            />
        </div>
    );
}