import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

function useDarkMode(): [string, React.Dispatch<any>] {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [colorTheme, setTheme];
}

export default function DarkModeSwitch(): JSX.Element {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <button
      id="theme-toggle"
      type="button"
      className="text-ltext-low dark:text-dtext-med 
      hover:bg-lhover-gray dark:hover:bg-dhover-gray 
      focus:outline-none focus:ring-4 
      focus:ring-lhover-gray dark:focus:ring-dhover-gray 
      rounded-lg text-sm p-2.5"
      onClick={() => setTheme(colorTheme)}>
      {colorTheme === 'light' ? (
        <SunIcon
          id="theme-toggle-light-icon"
          className="h-5 w-5 "
          aria-hidden="true"
        />
      ) : (
        <MoonIcon
          id="theme-toggle-dark-icon"
          className="h-5 w-5 "
          aria-hidden="true"
        />
      )}
    </button>
  );
}
