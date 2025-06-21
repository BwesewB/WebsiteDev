"use client"

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ControllableLottie from "@/components/atoms/ControllableLottie/page";

import styles from "./flare.module.css"
import ProjectHero from "@/components/templates/projectHero/page"
import SectionOne from "@/components/templates/SectionOne/page"
import SectionTwo from "@/components/templates/SectionTwo/page"
import SectionThree from "@/components/templates/SectionThree/page"
import SectionFive from "@/components/organisms/SectionFive/page"
import SectionSix from "@/components/templates/SectionSix/page"
import SectionSeven from "@/components/templates/SectionSeven/page"
import TwoColumnMediaLayout from "@/components/templates/TwoColumnMediaLayout/page";
import SectionEight from "@/components/templates/SectionEight/page"
import dynamic from "next/dynamic";
import logoAnimation from "/public/media/flare/LogoAnimation.json";


gsap.registerPlugin(ScrollTrigger);
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Flare({}) {
    const lottieRef = useRef(null);
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        // We use a small timeout to ensure ScrollSmoother has initialized first.
        // This is the key to solving the race condition.
        const timeout = setTimeout(() => {
            const lottieInstance = lottieRef.current;
            const triggerElement = triggerRef.current;

            console.log("Attempting to create ScrollTrigger...");
            console.log("Trigger Element:", triggerElement);
            console.log("Lottie Instance:", lottieInstance);

            if (!lottieInstance || !triggerElement) {
                console.error("GSAP setup failed: a ref is missing.");
                return;
            }

            lottieInstance.stop();

            const ctx = gsap.context(() => {
                console.log("GSAP context creating...");
                ScrollTrigger.create({
                    trigger: triggerElement,
                    start: "top 60%",
                    onEnter: () => lottieInstance.play(),
                    onLeave: () => lottieInstance.stop(),
                    onEnterBack: () => lottieInstance.play(),
                    onLeaveBack: () => lottieInstance.stop(),
                    // markers: true
                });
            }, triggerRef);

            // Store the context on the timeout to clean it up properly
            // timeout.ctx = ctx;

        }, 100); // 100ms delay

        return () => {
            clearTimeout(timeout);
            if (timeout.ctx) {
                timeout.ctx.revert();
            }
        };
    }, []);

    return (
        <div className="container">
            <ProjectHero 
                projectName="Flare"
                projectRole="Marketing & Animation"
                date="2024"
                imageSrc="/media/flare/MockupPhoneFlareCropped.webp"
                toolsUsed="Adobe Illustrator / Adobe InDesign / After Effects / Figma / React.js"
                textColour="var(--black)"
                mediaWidth="80%"
            />
            <SectionOne 
                paragraphTitleText="Your BC wildfire safety app with weather updates, fire alerts, and related news all into one intuitive app."
            />
<TwoColumnMediaLayout
    textSide="right" // Main textBlocks (Wildfire info) will be on the RIGHT.
                     // mediaColumnItems (the 3 buttons) will be on the LEFT.
    
    textBlocks={[ // This content goes to the RIGHT column
        { 
            header: "The Rising Danger of Wildfires", 
            paragraph: "British Columbia is facing increasingly severe wildfire seasons..." 
        },
        { 
            header: "How Flare Makes a Difference", 
            paragraph: "Flare provides users with a quick and accessible answer..." 
        }
    ]}

    mediaColumnItems={[ // This content goes to the LEFT column
        {
            type: 'buttons', 
            items: [
                { text: "VISIT", icon: "arrow", externalLink: "..." },
                { text: "SOURCE CODE", icon: "github", externalLink: "..." },
                { text: "WIREFRAME", icon: "figma", externalLink: "..." }
            ]
        }
    ]}
    
    // NOW, to make the physical LEFT side sticky:
    stickyConfig={{ column: 'left' }} 
    
    textColour="var(--black)"
/>
            <ControllableLottie
                ref={triggerRef}
                lottieRef={lottieRef}
                animationData={logoAnimation}
                className={styles.fullWidth} 
            />
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
<TwoColumnMediaLayout
    textSide="left" // Main textBlocks (Design Process) and its 'buttons' prop will be on the LEFT.
                    // mediaColumnItems (the 3 images) will be on the RIGHT.

    textBlocks={[ // This content goes to the LEFT column
        { 
            header: "Design Process", 
            paragraph: "A team of four designers was responsible..." 
        }
    ]}
    buttons={[ // This 'buttons' prop is part of text-centric content, so it also goes to the LEFT column
        {
            text: "WIREFRAME",
            icon: "figma",
            externalLink: "..." // Please fill in the actual link
        }
    ]}

    mediaColumnItems={[ // This content (the 3 images) goes to the RIGHT column
        { imageSrc: "/media/flare/MockupPhoneMap.png" },
        { imageSrc: "/media/flare/MockupPhoneNews.png" },
        { imageSrc: "/media/flare/MockupPhoneSafety.png" }
    ]}

    // NOW, to make the physical LEFT side sticky:
stickyConfig={{ column: 'left'}}
    
    textColour="var(--black)"
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