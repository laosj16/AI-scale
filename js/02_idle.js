// js/02_idle.js
// Rely on 'defer' attribute, remove DOMContentLoaded wrapper

const promptElement = document.getElementById('promptText');
const audioElement = document.getElementById('promptAudio');

if (promptElement && audioElement) {
  // Add event listener that triggers on every click
  promptElement.addEventListener('click', () => {
    console.log("Prompt text clicked!"); // Add log for debugging
    // Optional: If audio is already playing, restart it from the beginning
    if (!audioElement.paused) {
      audioElement.currentTime = 0;
    }

    // Attempt to play the audio when the text is clicked
    const playPromise = audioElement.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Playback started successfully
        console.log("Audio playback started on click.");
      }).catch(error => {
        // Playback failed
        console.error("Audio playback failed on click:", error);
        // Inform user if needed, e.g.:
        // alert("无法播放声音: " + error.message);
      });
    } else {
         // Fallback for browsers where play() doesn't return a promise (older)
         console.log("Audio play() called (no promise returned).");
    }
  });
} else {
  // Log errors if elements aren't found - crucial for debugging
  if (!promptElement) console.error("Prompt element #promptText not found.");
  if (!audioElement) console.error("Audio element #promptAudio not found. Check HTML and file path 'audio/qzstzc.mp3'.");
}
