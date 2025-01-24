import SectionOne from "../../../../components/projectTemplates/SectionOne/page";
import SectionThree from "../../../../components/projectTemplates/SectionThree/page";
import SectionTwo from "../../../../components/projectTemplates/SectionTwo/page";
import styles from "./blackHole.module.css";
import ProjectHero from "@/app/components/projectTemplates/projectHero/page.js";

export default function blackHole() {
    return (
        <div className={styles.container}>
            <ProjectHero 
                projectName="Black Hole"
                date="2023-2024"
                videoSrc="/videos/blackHole/Revised Final (1).mp4"
                toolsUsed="After Effects, Illustrator, GSAP, Next.js "
                textColour="var(--white)"
            />
            <SectionOne 
                paragraphTitleText="Black hole is an interactive project that merges custom-designed After Effects assets with a 12-page interactive coded experience."
                textColour="var(--white)"
            />
            <SectionThree 
                    externalLink = "https://black-hole-design-3.vercel.app/"
                    buttonTextColour = "var(--black)"
                    backgroundColor = "var(--white)"
                    challengeHeader = "Motion Graphics"
                    challengeParagraph = "Time management was crucial for this project. With just ten weeks for ideation, storyboarding, and production, I had to work within strict limitations. While we had the skills to create vector graphics in After Effects, I knew achieving a polished look would require significant time and effort—after all, a well-executed project is always better than a rushed one. Instead of spending valuable time on complex vector designs, I focused solely on After Effects, prioritizing smooth animations and seamless transitions. This approach allowed me to allocate my time more efficiently and sync audio cues to enhance the cinematic quality of the final product."
                    solutionHeader = "Coded Interactive Website"
                    solutionParagraph = "My primary goal was to achieve three key features: smooth video playback, clean GSAP animations, and seamless transitions. To accomplish this, I structured my project using two types of video clips: transition clips and still clips. The transition clips served to smoothly bridge the gap between static scenes, ensuring that when a user clicked the “next” button, the still clip would transition seamlessly to the next without abrupt cuts. Without these dedicated still clips, the animation would feel disjointed, as users could trigger the next page while a moving animation was still playing, leading to a choppy experience. This strategic planning allowed for a fluid, professional user experience that aligned perfectly with my vision. With a six-week timeframe, understanding my interests and skills was crucial to the success of my project. Balancing this alongside a seven-member group project was challenging, but I was able to effectively plan and prioritize my tasks from the start. The project required us to create an interactive piece of media, with the flexibility to choose between coding, InDesign, Figma, or exploring unfamiliar software. I decided to focus on coding, leveraging my existing skills while carefully weighing the pros and cons of each option—avoiding potential pitfalls, such as the steep learning curve of new software that could hinder progress. "
            />
            <SectionTwo 
                videoSrc="/videos/blackHole/Clip12andReverse.mp4"
            />
        </div>
    );
}