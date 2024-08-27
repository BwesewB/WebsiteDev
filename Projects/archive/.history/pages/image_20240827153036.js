import styles from "@/styles/image.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import Header from "@/components/Header";
import ImageAndText from "@/components/imagesPage/imageAndText";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSection() {
    useEffect(() => {
        const timeline1 = gsap.timeline();
        const timeline2 = gsap.timeline();

        timeline1.fromTo(
            `.${styles.letters} > div`,
            {
                y: "100%",
                opacity: 0
            },
            {
                y: "0%",
                opacity: 1,
                duration: 2,
                ease: "power4.inOut",
                stagger: 0.05,
            }
        )
        .to(
            `.${styles.letters} > div`,
            {
                y: "-100%",
                opacity: 0,
                duration: 2,
                ease: "power4.inOut",
                stagger: 0.05,
                delay: 1
            }
        );

        timeline2.fromTo(`.${styles.imageContainerImage}`, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",

        }, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            delay: 4,
            duration: 1.5, // Animation duration
            ease: "power4.inOut" // Easing function
        });
    }, []);

    const [primaryColor, setPrimaryColor] = useState("var(--white)");
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Example logic: change color after scrolling 100px
            if (scrollPosition > window.innerHeight) {
                setPrimaryColor("var(--black)");
            } else {
                setPrimaryColor("var(--white)");
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
    <>
      <HeadData title="image" description="Gallery by Colin Chan"/>
      <main className={`${styles.main}`}>
        <LogoSection animate={true} lineVert={4.3} headerDelay={4.6}/>
        <div className={styles.header}>
            <div className={styles.letters}>
                <div>E</div>
                <div>X</div>
                <div>P</div>
                <div>O</div>
                <div>S</div>
                <div>U</div>
                <div>R</div>
                <div>E</div>
                <div>S</div>
            </div>
        </div>
        <div className={styles.imageContainerImage}>
            <Image 
                className={styles.actualImage}
                src="/images/corridor.jpg"
                layout="fill"
                objectFit="cover"
            />
        </div>
        <div className={styles.heighter}></div>
        <div className={styles.marginular}>
            <Header
                lineHoriz = {5.5}
                headerNamesDelay = {5.7}
                headerButtonDelay = {5.9}
                primaryColor={primaryColor}
            />
        </div>
        <div className={styles.imageContent}>
            <ImageAndText imageLink="/images/mandarinHw.jpg" top="20vh" left="55%" width="45rem" height="30rem" alt="" align="flex-end" number="10"/>
            <ImageAndText imageLink="/images/bathroom.jpg" width="24rem" height="20rem" top="65vh" left="20%" align="" alt="" number="11"/>
            <ImageAndText imageLink="/images/closeHw.jpg" width="24rem" height="20rem" top="90vh" left="60%" align="flex-end" alt="" number="12"/>
            <ImageAndText imageLink="/images/recipt.jpg" width="34rem" height="30rem" top="140vh" left="40%" align="" alt="" number="13"/>
            <div className={styles.bigImage}>
                <ImageAndText imageLink="/images/busDriver.jpg" width="96vw" height="50rem" top="" left="" align="flex-end" alt="" number="14"/>
            </div>
            <p className={styles.textular1}>a collection of fleeting moments</p>
            <ImageAndText imageLink="/images/lonley.jpg" width="25rem" height="25rem" top="120vh" left="65%" align="flex-end" alt="" number="15"/>
            <ImageAndText imageLink="/images/redperson.jpg" width="32rem" height="36rem" top="140vh" left="25%" align="" alt="" number="16"/>
            <ImageAndText imageLink="/images/portraitGreen.jpg" width="20rem" height="34rem" top="185vh" left="60%" align="flex-end" alt="" number="17"/>
            <ImageAndText imageLink="/images/window.jpg" width="30rem" height="24rem" top="230vh" left="20%" align="" alt="" number="18"/>
            <div className={styles.ofSomeone}>
                <p className={styles.textular2}>of someone who is in all the photos</p>
                <ImageAndText imageLink="/images/hangingOut.jpg" width="25rem" height="18rem" top="" left="" align="flex-end" alt="" number="19"/>
            </div>
            <ImageAndText imageLink="/images/disc.jpg" width="16rem" height="16rem" top="330vh" left="10%" align="" alt="" number="20"/>
            <ImageAndText imageLink="/images/" width="" height="" top="" left="" align="" alt="" number=""/>
            <ImageAndText imageLink="/images/" width="" height="" top="" left="" align="" alt="" number=""/>
            <Image/>
            <p className={styles.textular3}>and none</p>
            {/* <ImageAndText imageLink="" width="" height="" top="" left="" align="" alt="" number=""/> */}
        </div>



      </main>
    </>
  );
}
