import gsap from "gsap";

export function setupNavbarAnimations(
    hoverMenuRef,
    menuWordRef,
    navWordRef,
    linkContainers,
    arrowOneRef,
    arrowOneCircleRef,
    arrowTwoRef,
    arrowTwoCircleRef,
) {
  const ease = "expoScale";

  const handleMouseEnter = () => {
    gsap.to(menuWordRef.current, {
        y: 50,
        width: 0,
        duration: 0.3,
        ease: ease
    });

    gsap.to(navWordRef.current, {
        width: "auto",
        duration: 0.3,
        ease: ease
    });

    gsap.fromTo(
        linkContainers,
        { 
            y: -20
        },
        {
            y: 0,
            duration: 0.3,
            stagger: { each: 0.1, from: "end" },
            ease: ease
        }
    );

    gsap.to(arrowOneRef.current, {
        x: -50,
        opacity: 1,
        duration: 0.3,
        ease: "back.out"
    });

    gsap.to(arrowOneCircleRef.current, {
        width: 0,
        height: 0,
        opacity: 1,
        duration: 0.3,
        ease: ease
    });

    gsap.to(arrowTwoRef.current, {
        delay:0.2,
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "back.out"
    });

    gsap.to(arrowTwoCircleRef.current, {
        width: "60px",
        height: "60px",
        opacity: 1,
        duration: 0.3,
        ease: ease
    });
  };

  const handleMouseLeave = () => {
    gsap.to(navWordRef.current, {
        width: 0,
        duration: 0.3,
        ease: ease
    });

    gsap.to(menuWordRef.current, {
        width: "auto",
        y: 0,
        duration: 0.3,
        ease: ease
    });

    gsap.fromTo(
        linkContainers,
        { 
            y: 0
        },
        {
            y: -20,
            duration: 0.3,
            stagger: { each: 0.1, from: "end" },
            ease: ease
        }
    );

    gsap.fromTo(arrowOneRef.current, 
        {
            x:50
        },
        {
            delay: 0.2,
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "back.out"
        }
    );

    gsap.to(arrowOneCircleRef.current, {
        width: "60px",
        height: "60px",
        opacity: 1,
        duration: 0.3,
        ease: ease
    });

    gsap.to(arrowTwoRef.current, {
        x: -80,
        opacity: 1,
        duration: 0.3,
        ease: "back.out"
    });

    gsap.to(arrowTwoCircleRef.current, {
        width: 0,
        height: 0,
        opacity: 1,
        duration: 0.3,
        ease: ease
    });
  };

  return { handleMouseEnter, handleMouseLeave };
}
