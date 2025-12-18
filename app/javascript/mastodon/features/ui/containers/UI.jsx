import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import Sidebar from '../components/sidebar';
import MainContent from '../components/main_content';
import CustomAudioPlayer from '../../../components/CustomAudioPlayer'; // 경로 확인 필요

const UI = () => (
  <div className="layout">
    <Sidebar />
    <MainContent />
    <CustomAudioPlayer src="/audio/sample.mp3" />
  </div>
);

export default connect(mapStateToProps)(injectIntl(withRouter(UI)));
