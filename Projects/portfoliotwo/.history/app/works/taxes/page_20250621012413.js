import ProjectHero from "@/components/templates/projectHero/page"
import SectionThree from "@/components/templates/SectionThree/page"
import styles from "./taxes.module.css"
import TwoColumnMediaLayout from "@/components/templates/TwoColumnMediaLayout/page"

export default function Taxes ({

}) {
    return (
        <div className="container">
            <ProjectHero 
                projectName="TAXES!"
                date="2023-2024"
                videoSrc="/media/taxes/GOTTEM.mp4"
                toolsUsed="Adobe After Effects"
                textColour="var(--black)"
                initialMute={false}
            />
            <TwoColumnMediaLayout
                textSide="right"
                
                textBlocks={[ 
                    { 
                        header: "Taxation Frustration", 
                        paragraph: "Turning 18 introduced the unexpected challenge of taxes—an experience both frustrating and complex. To capture this, a lighthearted and comedic video was crafted to poke fun at the struggles of navigating taxes as a young adult with a light and colorful theme. The creative direction shifted from using complex graphics to incorporating video clips, with graphic elements setting up what would unfold in the video. This decision allowed for smoother storytelling and dynamic pacing, providing a fresh and engaging way to turn a stressful situation into something relatable and entertaining." 
                    }
                ]}

                mediaColumnItems={[ // This content goes to the LEFT column
                    {
                        type: 'buttons', 
                        items: [
                            { text: "Web PDF", icon: "arrow", externalLink: "/media/magazine/ReimaginingSpaces.pdf" },
                        ]
                    }
                ]}
                
                // NOW, to make the physical LEFT side sticky:
                stickyConfig={{ column: 'left' }} 
                
                textColour="var(--black)"
            />
            <SectionThree 
                challengeHeader = "Taxation Frustration"
                challengeParagraph = "Turning 18 introduced the unexpected challenge of taxes—an experience both frustrating and complex. To capture this, a lighthearted and comedic video was crafted to poke fun at the struggles of navigating taxes as a young adult with a light and colorful theme. The creative direction shifted from using complex graphics to incorporating video clips, with graphic elements setting up what would unfold in the video. This decision allowed for smoother storytelling and dynamic pacing, providing a fresh and engaging way to turn a stressful situation into something relatable and entertaining."
            />
        </div>
    )
}