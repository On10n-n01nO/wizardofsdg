import React, { useRef, useState, useEffect } from 'react';
import './music_token.scss';

const MusicToken = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // 무한 반복
    }
  }, []);

  return (
    <div className="music-token" onClick={togglePlay}>
      {playing ? '⏸' : '▶'}
      <audio ref={audioRef} src="/sounds/music.mp3" />
    </div>
  );
};

export default MusicToken;
