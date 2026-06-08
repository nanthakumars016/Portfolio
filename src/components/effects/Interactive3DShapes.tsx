import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  Float,
  MeshDistortMaterial,
  Icosahedron,
} from "@react-three/drei";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────
// Glowing central developer crystal (icosahedron)
// ─────────────────────────────────────────────────────────
function DevCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    glowRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
    glowRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <group>
      {/* Outer wireframe glow */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Main distorted crystal */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1.05, 2]} />
          <MeshDistortMaterial
            color={hovered ? "#00DC82" : "#7C3AED"}
            distort={hovered ? 0.45 : 0.22}
            speed={3}
            roughness={0.05}
            metalness={1.0}
            emissive={hovered ? "#00DC82" : "#4C1D95"}
            emissiveIntensity={hovered ? 0.7 : 0.35}
          />
        </mesh>
      </Float>
    </group>
  );
}

// ─────────────────────────────────────────────────────────
// Orbiting skill node
// ─────────────────────────────────────────────────────────
type SkillDef = {
  label: string;
  color: string;
  radius: number;
  speed: number;
  yOff: number;
};

const SKILLS: SkillDef[] = [
  { label: "React.js",    color: "#61DAFB", radius: 2.5, speed:  0.60, yOff:  0.40 },
  { label: "Node.js",     color: "#3FC74E", radius: 2.8, speed: -0.50, yOff: -0.30 },
  { label: "Nuxt.js",     color: "#00DC82", radius: 2.4, speed:  0.75, yOff:  0.00 },
  { label: "MySQL",       color: "#4479A1", radius: 3.0, speed: -0.40, yOff:  0.60 },
  { label: "TypeScript",  color: "#3178C6", radius: 2.6, speed:  0.65, yOff: -0.50 },
  { label: "MongoDB",     color: "#47A248", radius: 2.9, speed: -0.58, yOff:  0.20 },
];

function SkillOrbit({ label, color, radius, speed, yOff }: SkillDef) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.z = Math.sin(t) * radius;
    groupRef.current.position.y =
      yOff + Math.sin(state.clock.elapsedTime * 0.9 + radius) * 0.25;
    if (textRef.current) textRef.current.lookAt(state.camera.position);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
        />
      </mesh>
      <Text
        ref={textRef}
        fontSize={0.21}
        color={color}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.27, 0]}
        outlineWidth={0.006}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}

// ─────────────────────────────────────────────────────────
// Code rain characters
// ─────────────────────────────────────────────────────────
const CODE_CHARS = [
  "</>", "{}", "()", "=>", "[]", "fn", "if",
  "&&", "||", "++", "::", "var", "let", "const",
];

function CodeParticle({ index }: { index: number }) {
  const ref = useRef<any>(null);
  const data = useMemo(() => ({
    x: (Math.random() - 0.5) * 9,
    z: (Math.random() - 0.5) * 9,
    speed: 0.28 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
    color: Math.random() > 0.5 ? "#7C3AED" : "#00DC82",
    size: 0.09 + Math.random() * 0.11,
    startY: -2 + Math.random() * 8,
  }), []);

  useFrame((state) => {
    if (!ref.current) return;
    const elapsed = (state.clock.elapsedTime * data.speed + data.phase) % 1;
    ref.current.position.y = data.startY - elapsed * 8;
    ref.current.material.opacity = Math.sin(elapsed * Math.PI) * 0.65;
  });

  return (
    <Text
      ref={ref}
      fontSize={data.size}
      color={data.color}
      position={[data.x, data.startY, data.z]}
      anchorX="center"
      anchorY="middle"
      fillOpacity={0.6}
    >
      {data.char}
    </Text>
  );
}

function CodeRain() {
  return (
    <>
      {Array.from({ length: 30 }).map((_, i) => (
        <CodeParticle key={i} index={i} />
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────
// HERO 3D VISUAL — crystal + skill orbit + code rain
// ─────────────────────────────────────────────────────────
export function Hero3DVisual() {
  return (
    <div className="w-full h-[400px] md:h-[520px] relative select-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl opacity-50 pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 52 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-5, -4, -3]} intensity={1.5} color="#7C3AED" />
        <pointLight position={[6,  5,  4]} intensity={1.2} color="#00DC82" />
        <pointLight position={[0,  0,  6]} intensity={0.8} color="#8B5CF6" />

        <DevCrystal />
        {SKILLS.map((s) => <SkillOrbit key={s.label} {...s} />)}
        <CodeRain />
      </Canvas>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// DNA HELIX helpers
// ─────────────────────────────────────────────────────────
const STRAND_COLORS_A = ["#7C3AED", "#00DC82", "#61DAFB", "#EC4899", "#F59E0B"];
const STRAND_COLORS_B = ["#61DAFB", "#EC4899", "#7C3AED", "#00DC82", "#F59E0B"];

function HelixNode({
  index,
  total,
  phaseOffset,
  colorSet,
}: {
  index: number;
  total: number;
  phaseOffset: number;
  colorSet: string[];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const baseAngle = (index / total) * Math.PI * 4 + phaseOffset;

  useFrame((state) => {
    if (!ref.current) return;
    const angle = baseAngle + state.clock.elapsedTime * 0.7;
    ref.current.position.x = Math.cos(angle) * 1.2;
    ref.current.position.z = Math.sin(angle) * 0.55;
    ref.current.position.y = (index / total) * 6 - 3;
    const pulse = 0.08 + Math.sin(state.clock.elapsedTime * 2 + index * 0.4) * 0.03;
    ref.current.scale.setScalar(pulse);
  });

  const color = colorSet[index % colorSet.length];

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.8}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function HelixConnector({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const baseAngle = (index / total) * Math.PI * 4;

  useFrame((state) => {
    if (!ref.current) return;
    const angle = baseAngle + state.clock.elapsedTime * 0.7;
    const x1 = Math.cos(angle) * 1.2;
    const z1 = Math.sin(angle) * 0.55;
    const x2 = Math.cos(angle + Math.PI) * 1.2;
    const z2 = Math.sin(angle + Math.PI) * 0.55;
    const y = (index / total) * 6 - 3;

    ref.current.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
    ref.current.lookAt(new THREE.Vector3(x1, y, z1));
    const dist = Math.sqrt((x1 - x2) ** 2 + (z1 - z2) ** 2);
    ref.current.scale.set(1, 1, dist * 0.5);
  });

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.018, 0.018, 1, 6]} />
      <meshStandardMaterial
        color="#8B5CF6"
        emissive="#8B5CF6"
        emissiveIntensity={0.6}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

// Floating developer-role label
const ABOUT_LABELS = [
  { text: "Full-Stack Dev",   color: "#8B5CF6" },
  { text: "Team Lead",        color: "#00DC82" },
  { text: "SaaS Builder",     color: "#61DAFB" },
  { text: "API Architect",    color: "#EC4899" },
  { text: "React Expert",     color: "#F59E0B" },
];

function RoleLabel({
  text,
  color,
  index,
  total,
}: {
  text: string;
  color: string;
  index: number;
  total: number;
}) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.38 + (index / total) * Math.PI * 2;
    ref.current.position.x = Math.cos(t) * 2.3;
    ref.current.position.z = Math.sin(t) * 1.1;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + index) * 1.4;
    ref.current.lookAt(state.camera.position);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.19}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.006}
      outlineColor="#000000"
    >
      {text}
    </Text>
  );
}

// ─────────────────────────────────────────────────────────
// ABOUT 3D VISUAL — DNA helix + orbiting role labels
// ─────────────────────────────────────────────────────────
export function About3DVisual() {
  const TOTAL = 18;
  return (
    <div className="w-full h-[360px] md:h-[440px] relative select-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/15 via-transparent to-primary/15 blur-3xl opacity-50 pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 52 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -4, -3]} intensity={1.2} color="#7C3AED" />
        <pointLight position={[4,  5,  3]} intensity={1.0} color="#00DC82" />

        {/* Strand A */}
        {Array.from({ length: TOTAL }).map((_, i) => (
          <HelixNode
            key={`a-${i}`}
            index={i}
            total={TOTAL}
            phaseOffset={0}
            colorSet={STRAND_COLORS_A}
          />
        ))}
        {/* Strand B (offset by π) */}
        {Array.from({ length: TOTAL }).map((_, i) => (
          <HelixNode
            key={`b-${i}`}
            index={i}
            total={TOTAL}
            phaseOffset={Math.PI}
            colorSet={STRAND_COLORS_B}
          />
        ))}
        {/* Connectors */}
        {Array.from({ length: TOTAL }).map((_, i) => (
          <HelixConnector key={`c-${i}`} index={i} total={TOTAL} />
        ))}

        {/* Role labels */}
        {ABOUT_LABELS.map((l, i) => (
          <RoleLabel
            key={l.text}
            text={l.text}
            color={l.color}
            index={i}
            total={ABOUT_LABELS.length}
          />
        ))}
      </Canvas>
    </div>
  );
}
