import { useEffect, useState } from 'react';
import { Timer } from './components/Timer';
import { Todo } from './components/Todo';
import { Settings } from './components/Settings';
import SettingsContext from './context/SettingsContext';
import { SettingsIcon } from './assets/icons/SettingsIcon';
import { HomeIcon } from './assets/icons/HomeIcon';
import { MoonIcon } from './assets/icons/MoonIcon';
import { SunIcon } from './assets/icons/SunIcon';

function App() {
  const [theme, setTheme] = useState('dark');
  const [showSettings, setShowSettings] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen max-w-screen-lg mx-auto p-8 font-semibold">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <h1 className="text-red-400 text-3xl">Pomodoro</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSettings(false)}
            className="btn btn-square"
          >
            <HomeIcon />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="btn btn-square"
          >
            <SettingsIcon />
          </button>
          <button
            onClick={() => toggleTheme()}
            className="theme-controller btn btn-square"
          >
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
      <div className="flex flex-col h-[600px] gap-9 md:flex-row lg:w-full">
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            sessionMinutes,
            setSessionMinutes,
            breakMinutes,
            setBreakMinutes,
          }}
        >
          {!showSettings ? (
            <>
              <Timer />
              <Todo />
            </>
          ) : (
            <Settings />
          )}
        </SettingsContext.Provider>
      </div>
    </div>
  );
}

export default App;
