import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const CustomAudioPlayer = ({ src, alt }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // 재생 상태 토글
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="custom-audio-player">
      <button
        onClick={togglePlay}
        aria-label={playing ? 'Pause audio' : 'Play audio'}
      >
        {playing ? '⏸' : '▶'}
      </button>

      <audio
        ref={audioRef}
        src={src}
      />

      {alt && <span className="sr-only">{alt}</span>}
    </div>
  );
};

CustomAudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default CustomAudioPlayer;
