"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor({ isHovered }) {
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef();
  const [cursorSize, setCursorSize] = useState(20); // Initial cursor size

  useEffect(() => {
    gsap.set(circle.current, { left: 0, top: 0, opacity: 0 });

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  // Smoothly animate the cursor size when hovering
  useEffect(() => {
    gsap.to(circle.current, {
      scale: isHovered ? 2.5 : 1, // Smoothly scale from 1 (20px) to 2.5 (50px)
      duration: 0.3, // Adjust the duration to control the speed of the animation
      ease: "power3.out",
    });
  }, [isHovered]);

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.current = { x: clientX, y: clientY };
    moveCircle(mouse.current.x, mouse.current.y);
  };

  const moveCircle = (x, y) => {
    gsap.to(circle.current, {
      left: `${x - cursorSize / 2}px`,
      top: `${y - cursorSize / 2}px`,
      duration: 0.3,
      opacity: 1,
      ease: "power3.out",
    });
  };

  return (
    <div>
      <div
        ref={circle}
        style={{
          width: `${cursorSize}px`, // Use the cursorSize state for the initial size
          height: `${cursorSize}px`, // Use the cursorSize state for the initial size
          backgroundColor: "var(--blue)", // Use your preferred color here
          borderRadius: "100%",
          position: "fixed",
          opacity: 0,
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
        //   mixBlendMode: "exclusion",
        }}
      ></div>
    </div>
  );
}


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { useCursor } from "./CursorContext";

// export default function CustomCursor() {
//   const { isHovered } = useCursor(); // Consume the cursor state from context
//   const circle = useRef();
//   const [cursorSize, setCursorSize] = useState(20); // Initial cursor size

//   useEffect(() => {
//     gsap.set(circle.current, { left: 0, top: 0, opacity: 0 });

//     window.addEventListener("mousemove", manageMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", manageMouseMove);
//     };
//   }, []);

//   // Smoothly animate the cursor size when hovering
//   useEffect(() => {
//     gsap.to(circle.current, {
//       scale: isHovered ? 2.5 : 1, // Smoothly scale from 1 (20px) to 2.5 (50px)
//       duration: 0.3, // Adjust the duration to control the speed of the animation
//       ease: "power3.out",
//     });
//   }, [isHovered]);

//   const manageMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     moveCircle(clientX, clientY);
//   };

//   const moveCircle = (x, y) => {
//     gsap.to(circle.current, {
//       left: `${x - cursorSize / 2}px`,
//       top: `${y - cursorSize / 2}px`,
//       duration: 0.2,
//       opacity: 1,
//       ease: "power3.out",
//     });
//   };

//   return (
//     <div>
//       <div
//         ref={circle}
//         style={{
//           width: `${cursorSize}px`,
//           height: `${cursorSize}px`,
//           backgroundColor: "var(--blue)",
//           borderRadius: "100%",
//           position: "fixed",
//           opacity: 0,
//           top: 0,
//           left: 0,
//           zIndex: 9999,
//           pointerEvents: "none",
//         }}
//       ></div>
//     </div>
//   );
// }
