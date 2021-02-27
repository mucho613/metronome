const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

export const beep = () => {
  const oscillator = audioContext.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.value = 440;
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.value = 0.1;

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.02);
}

