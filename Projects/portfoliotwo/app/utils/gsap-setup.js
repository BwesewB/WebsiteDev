import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

// Tell GSAP about the CustomEase plugin
gsap.registerPlugin(CustomEase);

// Create and register your custom ease.
// The first argument "custom.default" is the name we will use everywhere.
CustomEase.create("custom.default", "0.8, 0, 0.2, 1");

// You can create more here if you want!
CustomEase.create("custom.bounce", "0.85, 0, 0.15, 1");

// This function is what we'll call to ensure everything is set up.
export function setupGsap() {
  // This function is intentionally empty. 
  // Its only purpose is to make sure this file's code runs when imported.
  console.log("GSAP Custom Eases Registered.");
}