import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import noop from 'lodash/noop';

import Bundle from 'mastodon/features/ui/components/bundle';
import { MediaGallery, Video, Audio } from 'mastodon/features/ui/util/async-components';
import CustomAudioPlayer from './custom_audio_player'; // ✅ import 위치 수정

export default class MediaAttachments extends ImmutablePureComponent {
  static propTypes = {
    status: ImmutablePropTypes.map.isRequired,
    lang: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    height: 110,
    width: 239,
  };

  updateOnProps = ['status'];

  renderLoadingMediaGallery = () => {
    const { height, width } = this.props;
    return <div className='media-gallery' style={{ height, width }} />;
  };

  renderLoadingVideoPlayer = () => {
    const { height, width } = this.props;
    return <div className='video-player' style={{ height, width }} />;
  };

  renderLoadingAudioPlayer = () => {
    const { height, width } = this.props;
    return <div className='audio-player' style={{ height, width }} />;
  };

  render() {
    const { status, width, height } = this.props;
    const mediaAttachments = status.get('media_attachments');
    const language = status.getIn(['language', 'translation']) || status.get('language') || this.props.lang;

    if (mediaAttachments.size === 0) {
      return null;
    }

    const type = mediaAttachments.getIn([0, 'type']);

    if (type === 'audio') {
      const audio = mediaAttachments.get(0);
      const description = audio.getIn(['translation', 'description']) || audio.get('description');

      return (
        <CustomAudioPlayer
          src={audio.get('url')}
          alt={description}
        />
      );
    } else if (type === 'video') {
      const video = mediaAttachments.get(0);
      const description = video.getIn(['translation', 'description']) || video.get('description');

      return (
        <Bundle fetchComponent={Video} loading={this.renderLoadingVideoPlayer}>
          {Component => (
            <Component
              preview={video.get('preview_url')}
              frameRate={video.getIn(['meta', 'original', 'frame_rate'])}
              blurhash={video.get('blurhash')}
              src={video.get('url')}
              alt={description}
              lang={language}
              width={width}
              height={height}
              inline
              sensitive={status.get('sensitive')}
              onOpenVideo={noop}
            />
          )}
        </Bundle>
      );
    } else {
      return (
        <Bundle fetchComponent={MediaGallery} loading={this.renderLoadingMediaGallery}>
          {Component => (
            <Component
              media={mediaAttachments}
              lang={language}
              sensitive={status.get('sensitive')}
              defaultWidth={width}
              height={height}
              onOpenMedia={noop}
            />
          )}
        </Bundle>
      );
    }
  }
}
