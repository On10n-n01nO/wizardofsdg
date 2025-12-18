import React from 'react';
import CustomAudioPlayer from '../../components/custom_audio_player';

const CustomAudioUI = () => (
  <div className="custom-audio-footer">
    <CustomAudioPlayer src="/sounds/music.mp3" />
  </div>
);

export default CustomAudioUI;
