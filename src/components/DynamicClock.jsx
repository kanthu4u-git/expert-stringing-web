import { useState, useEffect } from 'react';

function DynamicClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  const dateString = time.toLocaleDateString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{
        position: 'absolute',
        top: '1.5rem',
        right: '2rem',
        zIndex: 50,
        padding: '0.6rem 1.2rem',
        textAlign: 'right',
        background: 'rgba(15, 23, 42, 0.75)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--text-main)', letterSpacing: '1px' }}>
        {timeString}
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '600', textTransform: 'uppercase' }}>
        {dateString}
      </span>
    </div>
  );
}

export default DynamicClock;
