import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin.js";
import CustomEase from "@/unit/CustomEase/CustomEase.js";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(CustomEase);

export default gsap;