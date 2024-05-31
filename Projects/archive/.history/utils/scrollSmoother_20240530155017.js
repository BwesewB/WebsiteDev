import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);

const useScrollSmoother = () => {
  useEffect(() => {
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        wrapper: '.wrapper',
        content: '.content',
        smooth: 1.5, // Adjust the smoothness (default is 1)
      });
    }
  }, []);
};

export default useScrollSmoother;