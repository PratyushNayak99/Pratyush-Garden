"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function PlaneAnimation() {
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    gsap.to(planeRef.current, {
      duration: 10,
      repeat: -1,
      ease: "power1.inOut",
      motionPath: {
        path: "#flightPath",
        align: "#flightPath",
        alignOrigin: [0.8, 0.5],
        autoRotate: ["auto", 90] as any,
        offsetY: 4.75,
      },
    });
  }, []);

  return (
    // 1. Changed height to 700px
    <div className="w-full h-[800px] flex items-start justify-center">
      <svg
        // 2. Changed viewBox to be "tighter" around your path
        viewBox="500 450 800 1500" 
        xmlns="http://www.w3.org/2000/svg"
        // 3. Changed className to fill the container
        className="w-full h-full" 
      >
        <path
          id="flightPath"
          d="M 900 150 
             C 1200 400, 1200 800, 900 1100 
             S 600 1800, 900 2000"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="5"
          strokeDasharray="6 6"
        />

        <g ref={planeRef}>
          <g transform="rotate(50)">
            <image
              href="/origami-plane.svg"
              width="80"
              height="80"
              x="-40"
              y="-40"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}