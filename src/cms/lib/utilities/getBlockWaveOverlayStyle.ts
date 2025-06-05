export function getBlockWaveOverlayStyle(waveOverlay?: string | number, waveSVG?: string) {
  return waveOverlay
    ? {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "200px",
        backgroundImage: `url("${waveSVG}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pointerEvents: "none",
      } as React.CSSProperties
    : {};
}