import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll(
      ".sectionTitle, .introPanel, .benefitGrid > article, .familyGrid > article, .processSection, .partnerSection",
    ));
    let revealObserver;

    const syncMotion = () => {
      revealObserver?.disconnect();
      document.documentElement.classList.toggle("motionReady", !preference.matches);
      elements.forEach((element) => {
        element.classList.remove("revealPending");
        element.style.removeProperty("--reveal-delay");
      });
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
        element.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(element), 2) * 65}ms`);
        element.classList.add("revealPending");
        revealObserver.observe(element);
      });
    };

    syncMotion();
    preference.addEventListener("change", syncMotion);

    let frame = 0;
    const updateReview = () => {
      frame = 0;
      const contact = document.getElementById("contact");
      const contactTop = contact?.getBoundingClientRect().top ?? Infinity;
      setShowReview(window.scrollY > 400 && contactTop > window.innerHeight * 0.75);
    };
    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateReview);
    };
    updateReview();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      revealObserver?.disconnect();
      preference.removeEventListener("change", syncMotion);
      document.documentElement.classList.remove("motionReady");
      elements.forEach((element) => element.classList.remove("revealPending"));
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
