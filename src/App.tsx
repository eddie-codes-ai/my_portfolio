import { useState } from 'react';
import BootScreen from './components/BootScreen';
import Navbar from './components/Navbar';
import WhoAmI from './components/sections/WhoAmI';
import Architecture from './components/sections/Architecture';
import Deployments from './components/sections/Deployments';
import Logs from './components/sections/Logs';
import Connect from './components/sections/Connect';

function App() {
  const [booted, setBooted] = useState(false);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div style={{ width: '100%', background: 'var(--bg-primary)' }}>
      <Navbar />
      <main style={{ paddingTop: '56px', display: 'flex', flexDirection: 'column' }}>
        <WhoAmI />
        <Architecture />
        <Deployments />
        <Logs />
        <Connect />
      </main>
    </div>
  );
}

export default App;