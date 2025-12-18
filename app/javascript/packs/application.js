import './public-path';
import main from "mastodon/main"

import { start } from '../mastodon/common';
import { loadLocale } from '../mastodon/locales';
import { loadPolyfills } from '../mastodon/polyfills';

// import "../custom_audio_player";  <-- 이 줄은 삭제

start();

loadPolyfills()
  .then(loadLocale)
  .then(main)
  .catch(e => {
    console.error(e);
  });

// 페이지 로드 후 조건부로 audio player 초기화
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isSettingsPage = path.includes('/settings') || path.includes('/환경설정');

  if (!isSettingsPage) {
    import("../custom_audio_player").then(module => {
      // custom_audio_player가 export한 초기화 함수가 있다면 실행
      if (module.default) {
        module.default();
      }
    });
  }
});
