import React from 'react';
import KilatAvatar from './KilatAvatar';

/**
 * The avatar with a bit of life in it.
 *
 * It draws the same figure as KilatAvatar and only moves the wrapper, so the
 * child on the Hub and the child in the builder are one character. The
 * keyframes live in kilat-theme.css and are switched off under
 * prefers-reduced-motion along with everything else.
 */

const ANIMATIONS = {
  walk: 'avatar-walk 1.1s ease-in-out infinite',
  bounce: 'avatar-bounce 1.2s ease-in-out infinite',
  jump: 'avatar-jump 0.6s ease-out',
  celebrate: 'avatar-celebrate 0.7s ease-in-out infinite'
};

function AnimatedAvatar({ profile, animation = 'idle', size = 150 }) {
  return (
    <div
      style={{
        display: 'inline-block',
        transformOrigin: 'center bottom',
        animation: ANIMATIONS[animation] || 'none'
      }}
    >
      <KilatAvatar profile={profile} size={size} />
    </div>
  );
}

export default AnimatedAvatar;
