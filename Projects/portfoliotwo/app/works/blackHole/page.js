import LayoutEight from '@/components/templates/Layout-8/layoutEight';

import LayoutHero from '@/components/templates/LayoutHero/layoutHero';
import LayoutOne from "@/components/templates/Layout-1/layoutOne";
import LayoutNine from "@/components/templates/Layout-9/layoutNine";
import LayoutFive from "@/components/templates/Layout-5/layoutFive";
import LayoutFour from "@/components/templates/Layout-4/layoutFour";

export default function blackHole() {
    return (
        <>
            <div className="container">
                <LayoutHero 
                    videoSrc="/media/blackHole/RevisedFinal.mp4"
                    height='95vh'
                    title="BLACK HOLE"
                    buttons={[
                        { 
                            text: "Launch Website", 
                            externalLink: "https://black-hole-design-3.vercel.app/",
                            icon: "arrow" 
                        },
                        { 
                            text: "View Video", 
                            externalLink: "https://youtu.be/1ME1z9_jFwc",
                            icon: "" 
                        }
                    ]}
                    subHeader="Web & Motion Design"
                    paragraph="This project combined a vintage-style motion graphic video with a custom-built interactive website. The animation used grain, glow, and minimal graphics to emphasize rhythm, scale, and a focused visual narrative. The accompanying website, developed with Next.js and GSAP is a visual narrative using a structured system of transition and still clips to ensure a smooth and continuous flow."
                />
                <LayoutEight 
                    header="Concept and Style Development"
                    paragraph="This project began with clear planning around scope, timeline, and technical feasibility, focusing on the production of both a motion graphic video and an interactive website. Research included astrophysics fundamentals and the structure of black holes, as well as motion design techniques suitable for the 12-week timeframe. A black-and-white, grainy visual style was selected to support a minimal and focused presentation. Audio design involved combining low-frequency sound effects sourced from FILM CRUX to build a continuous soundtrack that supports the sense of scale and movement. These creative decisions helped define the visual and auditory consistency across the video and web experience while aligning with the project’s core aim of education on black holes."
                    videoSrc="/media/blackHole/Clip9.mp4"
                />
                <LayoutNine
                    header="Creating the Black Hole"
                    paragraph="The black hole disc was created using CC Ball Action and Radial Blur, later composited with 3D layers and used the Saber plugin for glowing edges on a circle. CC Star Burst was distorted behind the black hole using CC Flo Motion to simulate gravitational lensing, adding a touch of realism and reinforcing the sheer scale of the phenomenon."
                    videoSrc1="/media/blackHole/Disc_1.mp4"
                    videoSrc2="/media/blackHole/BlackHolePieces.mp4"
                />
                <LayoutFive
                    header="Composition"
                    paragraph="Sound design played a central role in establishing rhythm and structure throughout the motion graphic. Effects were timed precisely to align with visual changes, helping emphasize key moments while maintaining cohesion. The motion graphic ensured visual continuity and maintained a consistent pace throughout each composition. To do this, transition points were planned to minimize disruption, while effects such as Posterize Time, Glow, and Film Grain were applied uniformly across scenes to reinforce the intended aesthetic."
                    videoSrc="/media/blackHole/SmoothTransition.mp4"
                />
                {/* <LargeTextSection 
                    paragraphTitleText="An interactive project merging custom-designed After Effects assets with a 12-page coded experience."
                /> */}
                <LayoutOne
                    header="Interactive Website Development"
                    paragraph="The interactive site was developed using Next.js and GSAP to extend the visual tone and rhythm of the original video. The goal was to carry forward the controlled pacing and scale of the motion graphic, not just through design but through how each section moved and responded to user input. Assets from the video were adapted as still frames, and new compositions were created to support looping structure, maintaining visual consistency across all 12 pages. The favicon was created by Aleksa Radaković to match the websites' visual identity."
                    videoSrc="/media/blackHole/blackholewebsite.mp4"
                />
                <LayoutNine
                    header="Frame Transition System"
                    paragraph="To preserve a cinematic flow, a custom system was designed to separate page transitions into two layers: transition clips followed by looping still animations. This prevented visual interruptions and ensured animations never cut mid-motion when the user navigates. Only after the transition completed would the looping segment begin, followed by a delayed GSAP text reveal and the appearance of a navigation button. This sequence allowed transitions to breathe and reinforced the project’s emphasis on smooth transitions and a seamless flow."
                    videoSrc1="/media/blackHole/Clip8_Reversed_Low_optimized.mp4"
                    videoSrc2="/media/blackHole/Clip12andReverse.mp4"
                />
                <LayoutFour
                    header="Interaction Timing"
                    paragraph1="GSAP was used to synchronize interface elements such as text, buttons, and subtle hover states with the timing of each video segment. Motion was designed to be minimal and precise, only revealing elements when the background was fully in place. This careful orchestration of animation preserved the immersive tone while making each section feel intentional and controlled."
                    videoSrc="/media/blackHole/WebsiteIntro.mp4"
                />
            </div>
        </>
        
    );
}