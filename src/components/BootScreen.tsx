import { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

type Stage = 'idle' | 'authenticating' | 'unlocking' | 'granted' | 'fadeout';

const orbitIcons = [
  { icon: '🛡️', angle: 0, radius: 130, speed: 8 },
  { icon: '</>', angle: 45, radius: 130, speed: 8 },
  { icon: '🗄️', angle: 90, radius: 130, speed: 8 },
  { icon: '🔐', angle: 135, radius: 130, speed: 8 },
  { icon: '⚙️', angle: 180, radius: 130, speed: 8 },
  { icon: '🔑', angle: 225, radius: 130, speed: 8 },
  { icon: '💻', angle: 270, radius: 130, speed: 8 },
  { icon: '🌐', angle: 315, radius: 130, speed: 8 },
];

function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const [authText, setAuthText] = useState('');
  const [rotation, setRotation] = useState(0);
  const authString = '$ authenticating...';

  useEffect(() => {
    const t1 = setTimeout(() => setStage('authenticating'), 800);

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < authString.length) {
        setAuthText(authString.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 55);

    const t2 = setTimeout(() => setStage('unlocking'), 2200);
    const t3 = setTimeout(() => setStage('granted'), 3200);
    const t4 = setTimeout(() => setStage('fadeout'), 4000);
    const t5 = setTimeout(() => onComplete(), 4700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearInterval(typeInterval);
    };
  }, [onComplete]);

  useEffect(() => {
    let frame: number;
    let last = performance.now();

    const animate = (now: number) => {
      const delta = now - last;
      last = now;
      setRotation((r) => (r + delta * 0.04) % 360);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const isUnlocked = stage === 'unlocking' || stage === 'granted' || stage === 'fadeout';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: stage === 'fadeout' ? 0 : 1,
        transition: stage === 'fadeout' ? 'opacity 0.7s ease' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
        }}
      >
        {/* Orbit + Padlock container */}
        <div
          style={{
            position: 'relative',
            width: '320px',
            height: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Orbit ring */}
          <div
            style={{
              position: 'absolute',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '1px solid rgba(167, 139, 250, 0.15)',
              boxShadow: '0 0 30px rgba(167, 139, 250, 0.05)',
            }}
          />

          {/* Inner ring */}
          <div
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px solid rgba(167, 139, 250, 0.08)',
            }}
          />

          {/* Orbiting icons */}
          {orbitIcons.map((item, i) => {
            const angleRad = ((item.angle + rotation) * Math.PI) / 180;
            const x = Math.cos(angleRad) * item.radius;
            const y = Math.sin(angleRad) * item.radius;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  width: '36px',
                  height: '36px',
                  background: 'var(--bg-card)',
                  border: `1px solid ${isUnlocked ? 'var(--border-accent)' : 'var(--border)'}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  transition: 'border-color 0.4s ease',
                  boxShadow: isUnlocked
                    ? '0 0 10px rgba(167, 139, 250, 0.2)'
                    : 'none',
                }}
              >
                {item.icon}
              </div>
            );
          })}

          {/* Center padlock */}
          <div
            style={{
              position: 'relative',
              width: '90px',
              height: '110px',
              zIndex: 2,
            }}
          >
            {/* Glow behind padlock */}
            {isUnlocked && (
              <div
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
                  animation: 'pulseGlow 1.5s ease infinite',
                }}
              />
            )}

            {/* Shackle */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: isUnlocked
                  ? 'translateX(-50%) translateY(-16px) rotate(-45deg)'
                  : 'translateX(-50%) translateY(0px) rotate(0deg)',
                transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: '10% 90%',
              }}
            >
              <svg width="58" height="48" viewBox="0 0 58 48" fill="none">
                <path
                  d="M9 44 L9 20 Q9 4 29 4 Q49 4 49 20 L49 44"
                  stroke={isUnlocked ? '#a78bfa' : '#484f58'}
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  style={{ transition: 'stroke 0.5s ease' }}
                />
              </svg>
            </div>

            {/* Lock body */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '76px',
                height: '66px',
                background: isUnlocked
                  ? 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.05))'
                  : 'var(--bg-card)',
                border: `2px solid ${isUnlocked ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s ease',
              }}
            >
              {/* Keyhole */}
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <circle
                  cx="11"
                  cy="9"
                  r="5.5"
                  stroke={isUnlocked ? '#a78bfa' : '#484f58'}
                  strokeWidth="2.5"
                  style={{ transition: 'stroke 0.5s ease' }}
                />
                <path
                  d="M8 14 L14 14 L12 23 L10 23 Z"
                  fill={isUnlocked ? '#a78bfa' : '#484f58'}
                  style={{ transition: 'fill 0.5s ease' }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Terminal text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            minHeight: '52px',
          }}
        >
          {stage !== 'idle' && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              {authText}
              {stage === 'authenticating' && authText.length < authString.length && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '14px',
                    background: 'var(--accent)',
                    marginLeft: '2px',
                    verticalAlign: 'middle',
                    animation: 'blink 0.7s step-end infinite',
                  }}
                />
              )}
            </div>
          )}

          {(stage === 'granted' || stage === 'fadeout') && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--green)',
                animation: 'fadeInUp 0.4s ease forwards',
              }}
            >
              [OK] Access granted.
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default BootScreen;