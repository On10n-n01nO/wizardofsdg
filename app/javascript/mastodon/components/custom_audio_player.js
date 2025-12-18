import React, { useRef, useState, useEffect } from 'react';

const CustomAudioPlayer = ({ src, alt }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

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

  // 진행바 업데이트
  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);
  };

  // 진행바 드래그로 위치 변경
  const handleSeek = (e) => {
    const duration = audioRef.current.duration;
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  return (
    <div className="custom-audio-player">
      <button onClick={togglePlay}>
        {playing ? '⏸ Pause' : '▶ Play'}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
      />
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
      />
      {alt && <span className="sr-only">{alt}</span>}
    </div>
  );
};

export default CustomAudioPlayer;
