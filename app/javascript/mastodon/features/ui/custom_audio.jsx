// app/javascript/mastodon/features/ui/custom_audio.jsx
import React from 'react';
import CustomAudioPlayer from '../../components/custom_audio_player.js';

const CustomAudioUI = () => (
  <div className="custom-audio-footer">
    <CustomAudioPlayer src="/sounds/music.mp3" alt="Background music" />
  </div>
);

export default CustomAudioUI;
