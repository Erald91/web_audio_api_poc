(() => {
  const wavStopAndStartSound = async () => {
    const audioBuffer = await window.utilities.downloadAudioBuffer('/assets/wav/source_1.wav');
    const AudioContextClass = window.utilities.getAudioContext();
    // Create new audio context reference for the project
    const audioContext = new AudioContextClass();
    // Keep reference of the buffer source so we can handle sound
    let sourceBuffer = null;
    // Save reference time when playback was first initiated
    let startRefTime = null;
    // Offset will start from the first position
    let startOffset = 0;
    // Will start/resume playback from the last position it was left
    const start = () => {
      startRefTime = startRefTime === null ? audioContext.currentTime : startRefTime;
      sourceBuffer = audioContext.createBufferSource();
      sourceBuffer.buffer = audioBuffer;
      sourceBuffer.connect(audioContext.destination);
      sourceBuffer.start(0, Math.min(startOffset, audioBuffer.duration));
    };
    // Will stop playback and calculate offset when to resume when audio is played
    const stop = () => {
      if (!sourceBuffer) {
        return;
      }
      sourceBuffer.stop();
      startOffset = audioContext.currentTime - startRefTime;
    };
    // Create HTML container to place the control buttons
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.height = '80px';
    container.style.alignItems = 'center';
    // Create PLAY button
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', start);
    // Create PAUSE button
    const pauseButton = document.createElement('button');
    pauseButton.textContent = 'Pause';
    pauseButton.addEventListener('click', stop);
    // Append all controls to the container
    container.appendChild(playButton);
    container.appendChild(pauseButton);
    // Append container and show within the DOM
    document.body.appendChild(container);
  }
  window.wavStopAndStartSound = wavStopAndStartSound;
})();
