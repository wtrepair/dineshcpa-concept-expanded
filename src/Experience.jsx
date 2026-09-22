import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll(
      ".sectionTitle, .introCopy, .benefitGrid > article, .familyGrid > article, .specialGrid > article, .industryGrid article, .coverageGrid > article, .processList > article, .insightGrid > article, .contactCards > article, .partnerSection",
    ));
    const scenes = Array.from(document.querySelectorAll("[data-scroll-scene]"));
    const visibleScenes = new Set();
    const compact = window.matchMedia("(max-width: 680px)");
    const sceneObserver = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) visibleScenes.add(target);
          else visibleScenes.delete(target);
        });
        queueUpdate();
      }, { rootMargin: "100px" })
      : null;
    let revealObserver;
    let frame = 0;

    function updateScene() {
      frame = 0;
      const contact = document.getElementById("contact");
      const contactTop = contact?.getBoundingClientRect().top ?? Infinity;
      setShowReview(window.scrollY > 400 && contactTop > window.innerHeight * 0.75);
      if (preference.matches) return;

      const range = compact.matches ? 10 : 32;
      // Only measure visible scenes. Transform their artwork without moving the copy.
      const positions = Array.from(visibleScenes, (element) => {
        const bounds = element.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1,
          (window.innerHeight / 2 - bounds.top - bounds.height / 2) / ((window.innerHeight + bounds.height) / 2),
        ));
        return [element, progress * range];
      });
      positions.forEach(([element, offset]) => element.style.setProperty("--scroll-drift", `${offset.toFixed(2)}px`));
    }

    function queueUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateScene);
    }

    const syncMotion = () => {
      revealObserver?.disconnect();
      document.documentElement.classList.toggle("motionReady", !preference.matches);
      elements.forEach((element) => {
        element.classList.add("revealElement");
        element.classList.remove("revealPending");
        element.style.removeProperty("--reveal-delay");
      });
      scenes.forEach((element) => element.style.removeProperty("--scroll-drift"));
      if (preference.matches || !("IntersectionObserver" in window)) return;

      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.remove("revealPending");
          revealObserver.unobserve(target);
        });
      }, { rootMargin: "0px 0px -32px 0px", threshold: 0.04 });

      elements.forEach((element) => {
        // Anything already on screen stays visible, including restored scroll positions.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        const siblings = Array.from(element.parentElement.children);
        element.style.setProperty("--reveal-delay", `${(siblings.indexOf(element) % 3) * 90}ms`);
        element.classList.add("revealPending");
        revealObserver.observe(element);
      });
      queueUpdate();
    };

    syncMotion();
    preference.addEventListener("change", syncMotion);
    scenes.forEach((element) => sceneObserver?.observe(element));
    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      revealObserver?.disconnect();
      sceneObserver?.disconnect();
      preference.removeEventListener("change", syncMotion);
      document.documentElement.classList.remove("motionReady");
      elements.forEach((element) => element.classList.remove("revealPending", "revealElement"));
      scenes.forEach((element) => element.style.removeProperty("--scroll-drift"));
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`mobileReview ${showReview ? "visible" : ""}`} inert={!showReview}>
      <a href="#contact" className="button dark">
        Book a 10-year tax review <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
  );
}
