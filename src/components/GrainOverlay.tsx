export default function GrainOverlay() {
  return (
    <>
      <svg style={{ display: 'none' }} aria-hidden="true">
        <defs>
          <filter id="grain-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: 'fixed', inset: 0,
          filter: 'url(#grain-noise)',
          opacity: 0.038,
          pointerEvents: 'none',
          zIndex: 9990,
          mixBlendMode: 'overlay',
        }}
      />
    </>
  );
}
