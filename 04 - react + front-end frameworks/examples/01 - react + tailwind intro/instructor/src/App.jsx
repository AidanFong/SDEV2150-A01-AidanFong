import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// import the Header component I just made
import Header from './components/Header';
import Filters from './components/Filters'; // don't *need* file extension
import Results from './components/Results';
import Details from './components/Details';

function App() {
  return(
    // I need to wrap everything in a fragment <> </> *if* I have multiple top-level nodes/components —
    //   e.g. this Header & div component.
    // DOCS: https://react.dev/reference/react/Fragment

    // If it were just one parent component and a bunch of stuff nested under it, I don't need that.
    // This lets us avoid nesting everything under plain divs and complicating our DOM tree.
    <>
      <Header tagline="They made me come up with a tagline, but I have no imagination." />
      {/* Within a JSX block, comments look like this. I'm using Tailwind classes in this div for auto-spacing! */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch">
        <div className="w-full">
          <Filters />
        </div>
        <div className="w-full">
          <Results />
        </div>
        <div className="w-full">
          <Details />
        </div>
      </div>
    </>
  )
}

export default App;
