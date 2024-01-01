import { PlayIcon } from '../assets/icons/PlayIcon';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from '../context/SettingsContext';
import { PauseIcon } from '../assets/icons/PauseIcon';
import { ResetIcon } from '../assets/icons/ResetIcon';
import { SettingsIcon } from '../assets/icons/SettingsIcon';
import { classNames } from '../utils/classNames';

export const Timer = () => {
  const settings = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('session');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const isSession = mode === 'session';

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode = modeRef.current === 'session' ? 'break' : 'session';
    const nextSeconds =
      (nextMode === 'session'
        ? settings.sessionMinutes
        : settings.breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }
  useEffect(() => {
    secondsLeftRef.current = settings.sessionMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settings]);

  const totalSeconds = isSession
    ? settings.sessionMinutes * 60
    : settings.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <div className="p-6 border shadow-sm md:w-2/4 border-gray-400/30 rounded-xl">
      <h2 className="mb-6 text-2xl">Timer</h2>
      <hr className="mb-6 border-gray-400/30" />
      <div className="flex items-center justify-between mb-16">
        <p className="text-lg">Mode:</p>
        <button
          onClick={() => switchMode()}
          className={classNames(
            'btn btn-sm btn-outline',
            isSession ? 'btn-accent' : 'btn-warning'
          )}
        >
          {isSession ? 'Focus' : 'Pause'}
        </button>
      </div>
      {/* <div className="flex items-center justify-between mb-16">
        <p className="text-lg">Pause Mode:</p>
        <button className="btn btn-sm btn-outline btn-warning">Long</button>
      </div> */}
      <div className="flex justify-center mb-6">
        <div
          className={classNames(
            'radial-progress text-5xl',
            isSession ? 'text-accent' : 'text-warning'
          )}
          style={{
            '--value': percentage,
            '--size': '200px',
            '--thickness': '8px',
          }}
          role="progressbar"
        >
          {minutes + ':' + seconds}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => settings.setShowSettings(true)}
          className="btn btn-circle"
        >
          <SettingsIcon />
        </button>
        {isPaused ? (
          <button
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
            className="mt-3 btn btn-circle"
          >
            <PlayIcon />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
            className="mt-3 btn btn-circle"
          >
            <PauseIcon />
          </button>
        )}
        <button
          onClick={() => {
            setIsPaused(true);
            isPausedRef.current = true;
            setMode('session');
            modeRef.current = 'session';
            setSecondsLeft(settings.sessionMinutes * 60);
            secondsLeftRef.current = settings.sessionMinutes * 60;
          }}
          className="btn btn-circle"
        >
          <ResetIcon />
        </button>
      </div>
    </div>
  );
};
