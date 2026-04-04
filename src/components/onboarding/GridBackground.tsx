import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background'

export default function GridBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <FluidParticlesBackground
        particleCount={1500}
        noiseIntensity={0.003}
        particleSize={{ min: 0.5, max: 1.5 }}
        className="!h-full"
      />
    </div>
  )
}
