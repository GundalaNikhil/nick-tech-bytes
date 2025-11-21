"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const topics = [
  { name: "Java", icon: "☕" },
  { name: "Spring Boot", icon: "🍃" },
  { name: "React", icon: "⚛️" },
  { name: "Docker", icon: "🐳" },
  { name: "System Design", icon: "🏗️" },
  { name: "Java 8", icon: "☕" },
];

export default function RubiksCube() {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationX = -25;
    let rotationY = 35;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      rotationY += deltaX * 0.5;
      rotationX -= deltaY * 0.5;

      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    cube.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Auto-rotation when not dragging
    const autoRotate = setInterval(() => {
      if (!isDragging) {
        rotationY += 0.25;
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      }
    }, 50);

    return () => {
      cube.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(autoRotate);
    };
  }, []);

  // Shiny metallic silver mini cube - Silver Surfer style
  const MiniCube = () => {
    return (
      <div
        className="relative w-full h-full rounded-md overflow-hidden"
        style={{
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)",
        }}
      >
        {/* Base polished chrome silver - Silver Surfer style */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #e8e8e8 0%, #c0c0c0 50%, #989898 100%)",
          }}
        ></div>

        {/* Bright metallic shine */}
        <div
          className="absolute inset-0"
          style={{
            background: `
            linear-gradient(180deg, 
              rgba(255,255,255,0.4) 0%,
              rgba(240,240,240,0.25) 15%,
              rgba(200,200,200,0.15) 35%,
              rgba(160,160,160,0.12) 50%,
              rgba(120,120,120,0.18) 70%,
              rgba(80,80,80,0.25) 90%,
              rgba(50,50,50,0.3) 100%
            )
          `,
          }}
        ></div>

        {/* Chrome liquid metal reflection */}
        <div
          className="absolute inset-0"
          style={{
            background: `
            radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.5) 0%, rgba(245,245,245,0.25) 25%, transparent 50%),
            radial-gradient(ellipse at 65% 60%, rgba(220,220,225,0.3) 0%, transparent 35%)
          `,
          }}
        ></div>

        {/* Chrome reflection streak - brighter */}
        <div
          className="absolute inset-0"
          style={{
            background: `
            linear-gradient(130deg, 
              rgba(255,255,255,0.35) 0%, 
              rgba(255,255,255,0.15) 20%,
              transparent 35%,
              transparent 65%,
              rgba(0,0,0,0.2) 80%,
              rgba(0,0,0,0.3) 100%
            )
          `,
          }}
        ></div>

        {/* Subtle brushed metal texture */}
        <div
          className="absolute inset-0"
          style={{
            background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 2px
            )
          `,
          }}
        ></div>

        {/* Top edge bright chrome highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-[15%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.18) 60%, transparent 100%)",
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
          }}
        ></div>

        {/* Left edge bright chrome highlight */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[15%]"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.12) 60%, transparent 100%)",
            borderTopLeftRadius: "0.375rem",
            borderBottomLeftRadius: "0.375rem",
          }}
        ></div>

        {/* Bottom-right shadow - stronger for depth */}
        <div
          className="absolute bottom-0 right-0 w-[50%] h-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)",
          }}
        ></div>

        {/* Realistic rim lighting */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            boxShadow:
              "inset 0 0 4px rgba(255,255,255,0.15), inset 1px 1px 3px rgba(0,0,0,0.2), inset -1px -1px 2px rgba(255,255,255,0.1)",
          }}
        ></div>

        {/* Main bright specular highlight */}
        <div
          className="absolute w-4 h-4 rounded-full"
          style={{
            top: "22%",
            left: "30%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.15) 60%, transparent 80%)",
            filter: "blur(2px)",
          }}
        ></div>

        {/* Secondary chrome highlight */}
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            top: "55%",
            left: "65%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.2) 50%, transparent 80%)",
            filter: "blur(1px)",
          }}
        ></div>
      </div>
    );
  };

  // Complete 3x3 face with center topic label
  const CubeFace = ({
    topic,
    transform,
  }: {
    topic: (typeof topics)[0];
    transform: string;
  }) => (
    <div
      className="absolute"
      style={{
        width: "300px",
        height: "300px",
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3x3 Grid with realistic black gaps */}
      <div className="relative w-full h-full p-2 bg-black/95 rounded-xl">
        <div className="grid grid-cols-3 grid-rows-3 gap-[4px] w-full h-full p-[4px]">
          {[...Array(9)].map((_, idx) => (
            <div key={idx} className="relative">
              <MiniCube />
            </div>
          ))}
        </div>

        {/* Central topic label overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/30 shadow-2xl">
            <div className="text-5xl md:text-6xl mb-2 filter drop-shadow-2xl">
              {topic.icon}
            </div>
            <div className="text-lg md:text-xl font-bold text-white drop-shadow-2xl text-center tracking-wide">
              {topic.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CUBE_SIZE = 150; // Half of 300px face size

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          width: "400px",
          height: "400px",
          perspective: "1600px",
        }}
      >
        <div
          ref={cubeRef}
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-25deg) rotateY(35deg)",
            transition: "transform 0.08s linear",
          }}
        >
          {/* Front Face */}
          <CubeFace
            topic={topics[0]}
            transform={`translateZ(${CUBE_SIZE}px)`}
          />

          {/* Back Face */}
          <CubeFace
            topic={topics[1]}
            transform={`rotateY(180deg) translateZ(${CUBE_SIZE}px)`}
          />

          {/* Right Face */}
          <CubeFace
            topic={topics[2]}
            transform={`rotateY(90deg) translateZ(${CUBE_SIZE}px)`}
          />

          {/* Left Face */}
          <CubeFace
            topic={topics[3]}
            transform={`rotateY(-90deg) translateZ(${CUBE_SIZE}px)`}
          />

          {/* Top Face */}
          <CubeFace
            topic={topics[4]}
            transform={`rotateX(90deg) translateZ(${CUBE_SIZE}px)`}
          />

          {/* Bottom Face */}
          <CubeFace
            topic={topics[5]}
            transform={`rotateX(-90deg) translateZ(${CUBE_SIZE}px)`}
          />
        </div>

        {/* Enhanced realistic ground shadow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: "-80px",
            width: "320px",
            height: "160px",
          }}
        >
          {/* Primary crisp shadow */}
          <div
            className="absolute inset-0 rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 35%, transparent 65%)",
              filter: "blur(20px)",
            }}
          ></div>
          {/* Secondary soft shadow */}
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
              filter: "blur(35px)",
              transform: "scale(1.3)",
            }}
          ></div>
        </div>

        {/* Ambient studio lighting glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, rgba(120,180,255,0.4) 0%, transparent 55%)",
              filter: "blur(70px)",
            }}
          ></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 75% 75%, rgba(180,140,255,0.35) 0%, transparent 55%)",
              filter: "blur(70px)",
            }}
          ></div>
        </div>

        {/* Surface reflection beneath cube */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-15"
          style={{
            bottom: "-60px",
            width: "300px",
            height: "150px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)",
            filter: "blur(15px)",
          }}
        ></div>

        {/* Cube drop shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
          }}
        ></div>
      </motion.div>
    </div>
  );
}
