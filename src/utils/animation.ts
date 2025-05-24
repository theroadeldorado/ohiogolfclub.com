/**
 * Animation utility for fade-in effects
 */

// Define the animation class name
export const FADE_CLASS = 'fade-in-element';

// Define different animation delays for staggered effects
export const ANIMATION_DELAYS = {
  none: 0,
  sm: 0.1,
  md: 0.2,
  lg: 0.3,
  xl: 0.5,
};

/**
 * Initialize animations when document loads
 */
export const initAnimations = () => {
  if (typeof window === 'undefined') return;

  // Add observer to watch for elements with the fade class
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 100);

          // Stop observing once the animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before elements are in view
    }
  );

  // Observe all elements with the fade class
  const animateElements = document.querySelectorAll(`.${FADE_CLASS}`);
  animateElements.forEach((element) => {
    observer.observe(element);
  });
};

/**
 * Create fade-in animation for elements
 * @param delay Animation delay in seconds
 * @returns CSS class names for the animation
 */
export const fadeIn = (delay: keyof typeof ANIMATION_DELAYS = 'none') => {
  return `${FADE_CLASS}${delay !== 'none' ? ` delay-${delay}` : ''}`;
};
