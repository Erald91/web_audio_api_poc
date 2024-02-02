(() => {
  const wavBufferSourceLoader = async () => {
    const audioBuffer = await window.utilities.downloadAudioBuffer('/assets/wav/source_1.wav');
    const AudioContextClass = window.utilities.getAudioContext();
    const audioContext = new AudioContextClass();
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  }
  window.wavBufferSourceLoader = wavBufferSourceLoader;
})();
