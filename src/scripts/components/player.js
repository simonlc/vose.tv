import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { Subscribe } from 'unstated';
import StateContainer from './state-container';
import ShortNumber from './short-number';

const Player = () => (
  <Subscribe to={[StateContainer]}>
    {({ state, changeVideo }) => (
      <div className="player">
        <div className="player-embed" id="player-embed">
          {state.currentVideo ? (
            <YouTube
              videoId={state.currentVideo.id}
              opts={{
                playerVars: {
                  autoplay: 1,
                  color: 'white',
                  start: state.currentVideo.timestamp,
                },
              }}
              onEnd={() => changeVideo(state.currentVideoIndex + 1)}
            />
          ) : null}
        </div>
        {state.currentVideo ? (
          <>
            <header className="player-header">
              <h1 className="player-title">
                <a
                  href={`https://reddit.com${state.currentVideo.url}`}
                  target="_blank"
                >
                  {state.currentVideo.title}
                </a>
              </h1>
              {/* TODO Null operator here */}
              {state.currentVideo.flair && (
                <div className="player-flair">{state.currentVideo.flair}</div>
              )}
            </header>
            <footer className="player-footer">
              <a
                className="player-comments"
                href={`https://reddit.com${state.currentVideo.url}`}
                target="_blank"
              >
                <ShortNumber>{state.currentVideo.comments}</ShortNumber>{' '}
                comments
              </a>
              <div className="player-score">
                Score: <ShortNumber>{state.currentVideo.score}</ShortNumber>
              </div>
            </footer>
          </>
        ) : (
          <>
            <header className="player-header">
              <div className="player-title--preview" />
            </header>
            <footer className="player-footer">
              <div className="player-comments--preview" />
            </footer>
          </>
        )}
      </div>
    )}
  </Subscribe>
);

export default Player;
