"use client"

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ControllableLottie from "@/components/atoms/ControllableLottie/page";

import styles from "./flare.module.css"
import LargeTextSection from "@/components/templates/LargeTextSection/largeTextSection"
import dynamic from "next/dynamic";
import logoAnimation from "/public/media/flare/LogoAnimation.json";

import LayoutHero from "@/components/templates/LayoutHero/layoutHero";
import LayoutOne from "@/components/templates/Layout-1/layoutOne";
import LayoutNine from "@/components/templates/Layout-9/layoutNine";
import LayoutSeven from "@/components/templates/Layout-7/layoutSeven";

import mockupPhoneFlareCropped from "/public/media/flare/MockupPhoneFlareCropped.webp";
import flarePersona1 from "/public/media/flare/flarePersona1.webp";
import flarePersona2 from "/public/media/flare/flarePersona2.webp";
import userStoryMap from "/public/media/flare/userStoryMap.png";
import flareSitemap from "/public/media/flare/flareSitemap.png";
import flareStyleguide from "/public/media/flare/FlareStyleguide.png";
import mockupPhoneMap from "/public/media/flare/MockupPhoneMap.png";
import mockupPhoneNews from "/public/media/flare/MockupPhoneNews.png";
import mockupPhoneSafety from "/public/media/flare/MockupPhoneSafety.png";
import flareTriFold from "/public/media/flare/FlareTriFold.png";
import flareTriFold2 from "/public/media/flare/FlareTriFold2.png";
import mockupBusinessCard from "/public/media/flare/MockupBusinessCardCropped.png";
import flareTeam from "/public/media/flare/FlareTeam.png";

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
            <LayoutHero 
                height='min(55vw, 90vh)'
                title="Flare"
                subHeader="Marketing & Animation"
                paragraph="Flare provides users with a quick and accessible answer to address concerns about wildfires. Wildfires can have devastating impacts on remote areas, cutting off access to critical information and emergency services. Flare bridges this gap by providing real-time, reliable wildfire alerts, even for those living in isolated regions with limited access to traditional media or wildfire updates."
                imageSrc={mockupPhoneFlareCropped}
                buttons={[
                        { 
                            text: "Launch Website", 
                            externalLink: "https://www.flare-bc.com/",
                            icon: "arrow" 
                        },
                        { 
                            text: "Source Code", 
                            externalLink: "https://github.com/BCITKevin/Flare_IDSP",
                            icon: "github" 
                        },
                        { 
                            text: "Wireframe", 
                            externalLink: "https://www.figma.com/design/gPHPwANNCgyHX811XBko9g/Flare-Mockup?node-id=1291-5525&t=GMtl9kkT22wD2mLD-1",
                            icon: "figma" 
                        }
                    ]}
            />
            <LargeTextSection 
                paragraphTitleText="Your BC wildfire safety app with weather updates, fire alerts, and related news all into one intuitive app."
            />
            <LayoutOne 
                header="Competitive Analysis"
                paragraph="Before starting any design work, an in-depth Competitive Analysis Matrix was created to strategically position the app in the disaster prevention and mitigation market. Competitors were evaluated across five key factors: user experience, design and layout, features, technical implementation, and marketing platforms, guiding a more informed and differentiated approach."
                switch={true}
                children={
                    <ControllableLottie
                        ref={triggerRef}
                        lottieRef={lottieRef}
                        animationData={logoAnimation}
                        className={styles.fullWidth} 
                    />
                }
                viewHeight={false}
            />
            <LayoutNine
                header="Our Users"
                paragraph="User research for Flare revealed the difficulties residents, travelers, and rural communities face during wildfires, including unclear evacuation notices, misinformation, and limited access to resources. Studies on wildfire evacuation and human behavior during crises highlighted the need for real-time alerts, guided safety tips, and offline functionality to support users in high-stress situations. Insights from past wildfire events reinforced the importance of clear, accessible information to help individuals make informed decisions quickly and stay safe."
                imageSrc1={flarePersona1}
                imageSrc2={flarePersona2}
                mediaHeight="auto"
                viewHeight={false}
            />
            
            <LayoutOne 
                imageSrc={userStoryMap}
                header="User Flow"
                viewHeight={false}
            />

            <LayoutOne 
                imageSrc={flareSitemap}
                header="Flare Sitemap"
                paragraph="The Flare app sitemap organizes essential wildfire safety features into a clear, structured layout. The homepage provides quick access to the apps most important features such as wildfire levels, weather updates, safety and news. The news section aggregates wildfire reports, while the map section includes fire bans, weather forecasts, and fire risk data. The safety section offers preparation and emergency guides alongside an AI chatbot for wildfire-related inquiries. These features provide critical information and guidance, ensuring users can quickly access essential wildfire data and safety resources in an emergency."
                viewHeight={false}
            />

            <LayoutOne 
                imageSrc={flareStyleguide}
                header="Styleguide"
                height="auto"
                viewHeight={false}
                scale={0.7}
            />

            <LayoutSeven 
                header= "Design Process"
                paragraph= "A team of four designers was responsible for creating high-fidelity Figma mockups for each page, along with the logos, branding, and style guide. A dynamic, component-based design system was chosen, utilizing the shadcn/ui component library to serve as a UI library for the three developers. By considering this component library during the design process, the transition from design to code was streamlined, ensuring efficient implementation and consistency across the app."
                mediaItems={[
                    { imageSrc: mockupPhoneMap },
                    { imageSrc: mockupPhoneNews },
                    { imageSrc: mockupPhoneSafety }
                ]}
                mediaCarouselWidth="120vw"
                mediaCarouselHeight="50vh"
            />

            {/* <TwoColumnMediaLayout
                textSide="left"
                textBlocks={[ // This content goes to the LEFT column
                    { 
                        header: "User Testing", 
                        paragraph: "User tests were conducted during the HiFi and LoFi mockup stages, as well as throughout the coding process. Weekly sprints and user testing for all five website pages ensured continuous refinement and improvement. These one-week sprints enabled rapid iteration based on feedback, aligning the designs with project goals while enhancing usability and functionality with each cycle."
                    }
                ]}

                mediaColumnItems={[
                    {
                        type: 'text',
                        items: [
                            {
                                header: "Navigation Architecture",
                                paragraph: "Structuring the site content in a clear and logical way was crucial to improving the user experience. The result is a carefully designed navigation system that enables users to quickly access any of the three features, ensuring ease of use when they need it most."
                            }
                        ]
                    },
                ]}
            /> */}
            <LargeTextSection 
                paragraphTitleText="To highlight the final product, a range of marketing materials was produced."
            />

            <LayoutOne 
                videoSrc="/media/flare/FlarePromoVideo.mp4"
                header="Promotional Video"
                mediaHeight="auto"
                viewHeight={false}
                scale={0.5}
            />

            <LayoutSeven 
                header= "Brochure & Business Card"
                paragraph= "The business cards and brochures were designed as part of the marketing collateral for a wildfire disaster response app. They featured a clean, informative layout that communicated the app’s purpose and key functions at a glance, making them effective tools for outreach and stakeholder presentations. Both materials were designed to maintain brand consistency and enhance professional credibility."
                mediaItems={[
                    { imageSrc: flareTriFold },
                    { imageSrc: flareTriFold2 },
                    { imageSrc: mockupBusinessCard }
                ]}
                mediaCarouselWidth="120vw"
                mediaCarouselHeight="50vh"
            />

            <LayoutNine
                header="Team"
                videoSrc1="/media/flare/FlareTechDemo.mp4"
                imageSrc2={flareTeam}
                mediaHeight="auto"
                viewHeight={false}
            />
        </div>
    )
}