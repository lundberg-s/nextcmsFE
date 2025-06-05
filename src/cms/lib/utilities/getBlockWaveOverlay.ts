export function getBlockWaveOverlay(waveOverlay?: string | number) {
  return `data:image/svg+xml,%3csvg viewBox='0 0 1440 ${waveOverlay}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3e%3cpath fill='white' d='M0,30 C360,150 1080,-20 1440,30 L1440,180 L0,180 Z' /%3e%3c/svg%3e`;
}