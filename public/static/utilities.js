(() => {
  const mergeUint8Array = (arr1, arr2) => {
    const merged = new Uint8Array(arr1.byteLength + arr2.byteLength);
    merged.set(arr1);
    merged.set(arr2, arr1.length);
    return merged;
  };
  const getAudioContext = () => {
    return (
      window.AudioContext ||
      window.mozAudioContext ||
      window.webkitAudioContext ||
      window.oAudioContext ||
      window.msAudioContext
    );
  };
  const downloadAudioBuffer = path => {
    const AudioContextClass = getAudioContext();
    if (!AudioContextClass) {
      throw new Error('Web Audio API is not supported in your browser!');
    }
    const audioContext = new AudioContext();
    const headers = new Headers();
    let chunks = new Uint8Array(0);
    // Request WAV file to be transferred by chunks and handle them as typed arrays
    // so we can handle them easily and create final AudioBuffer to play
    headers.append('Content-Type', 'arrayBuffer');
    const fetchPromise = fetch(path, {headers, method: 'GET'});
    return fetchPromise.then((response) => {
      if (response.status !== 200) {
        return Promise.resolve(null);
      }
      // Access readable stream instance from response body and retrieve
      // all the chunks until the stream is drained
      const reader = response.body.getReader();
      return reader.read().then(function handleChunks({done, value}) {
        if (done) {
          return new Promise(resolve => {
            // When stream is drained we can get AudioBuffer from the Uint8Array
            audioContext.decodeAudioData(chunks.buffer, audioBuffer => resolve(audioBuffer));
          });
        }
        chunks = mergeUint8Array(chunks, value);
        console.log('Chunk: ', value);
        return reader.read().then(handleChunks);
      });
    });
  };
  window.utilities = {
    mergeUint8Array,
    getAudioContext,
    downloadAudioBuffer
  }
})();