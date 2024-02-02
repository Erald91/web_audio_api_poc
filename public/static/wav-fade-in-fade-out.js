(() => {
  const wavFadeInFadeOut = async () => {
    const audioBufferOne = await window.utilities.downloadAudioBuffer('/assets/wav/source_2.wav');
    const audioBufferTwo = await window.utilities.downloadAudioBuffer('/assets/wav/source_3.wav');
    const AudioContextClass = window.utilities.getAudioContext();
    const audioContext = new AudioContextClass();
    let currentTime = audioContext.currentTime;
    const fadeTime = 2; // fade time in seconds
    const addSourceNode = (audioBuffer) => {
      // Create buffer source to attach downloaded audio buffer
      const source = audioContext.createBufferSource();
      // Create gain node to handle gain of played audio
      const gainNode = audioContext.createGain();
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      // Initially we will set gain to '0' so audio is silent
      gainNode.gain.linearRampToValueAtTime(0, currentTime);
      // When 'fadeTime' has passed we will increase gain and make audio noticeable
      gainNode.gain.linearRampToValueAtTime(1, currentTime + fadeTime);
      // When audio is near the end of the playback will set gain to '0' so current audio
      // can fade out and the next audio in the queue will fade in
      gainNode.gain.linearRampToValueAtTime(0, currentTime + audioBuffer.duration - fadeTime);
      source.start(currentTime);
      // The next audio in the queue will start when current will be finised
      currentTime = acurrentTime + audioBuffer.duration;
    };
    addSourceNode(audioBufferOne);
    addSourceNode(audioBufferTwo);
  };
  window.wavFadeInFadeOut = wavFadeInFadeOut;
})();
