import { BackIcon } from '../assets/icons/BackIcon';
import SettingsContext from '../context/SettingsContext';
import { useContext } from 'react';

export const Settings = () => {
  const settings = useContext(SettingsContext);
  return (
    <div className="w-full">
      <h2 className="text-2xl mb-6">Settings</h2>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-14 justify-center mb-8">
        <div className="flex flex-col gap-4 w-full">
          <label>Session: ({settings.sessionMinutes}:00)</label>
          <input
            type="range"
            min={1}
            max={120}
            value={settings.sessionMinutes}
            onChange={(e) => settings.setSessionMinutes(e.target.value)}
            className="range range-success"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <label>Break: ({settings.breakMinutes}:00)</label>
          <input
            type="range"
            min={1}
            max={30}
            value={settings.breakMinutes}
            onChange={(e) => settings.setBreakMinutes(e.target.value)}
            className="range range-warning"
          />
        </div>
      </div>
      <button
        onClick={() => settings.setShowSettings(false)}
        className="btn btn-outline btn-sm btn-secondary"
      >
        <BackIcon />
        Back
      </button>
    </div>
  );
};
