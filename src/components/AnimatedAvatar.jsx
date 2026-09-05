import React, { useEffect, useState } from 'react';

/**
 * Animated Avatar Component
 * Shows avatar with different animations: idle, walk, jump, celebrate
 */

function AnimatedAvatar({ profile, animation = 'idle', size = 150 }) {
  const gender = profile?.avatar?.gender || 'neutral';
  const skinColor = profile?.avatar?.skinColor || '#f4c4a0';
  const hairColor = profile?.avatar?.hairColor || '#8B4513';
  const outfitColor = profile?.avatar?.outfitColor || '#FF6B35';
  const hatType = profile?.avatar?.hatType || 'none';

  // Get animation styles
  const getAnimationStyle = () => {
    const baseStyle = {
      display: 'inline-block',
      transition: 'all 0.3s ease'
    };

    switch (animation) {
      case 'walk':
        return {
          ...baseStyle,
          animation: 'walk 1s ease-in-out infinite',
          transformOrigin: 'center bottom'
        };
      case 'jump':
        return {
          ...baseStyle,
          animation: 'jump 0.6s ease-in-out',
          transformOrigin: 'center bottom'
        };
      case 'celebrate':
        return {
          ...baseStyle,
          animation: 'celebrate 0.5s ease-in-out infinite'
        };
      case 'bounce':
        return {
          ...baseStyle,
          animation: 'bounce 1s ease-in-out infinite'
        };
      default:
        return baseStyle;
    }
  };

  if (gender === 'girl') {
    return (
      <div style={getAnimationStyle()}>
        <svg viewBox="0 0 100 150" style={{ width: size, height: size }}>
          {/* Head */}
          <circle cx="50" cy="40" r="25" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" />
          {/* Hair - Girl Long Hair */}
          <path
            d="M 25 40 Q 25 10, 50 15 Q 75 10, 75 40 Q 75 50, 50 65 Q 25 50, 25 40 Z"
            fill={hairColor}
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Hat/Accessory */}
          {hatType === 'bow' && (
            <>
              <path d="M 30 15 Q 25 10, 20 15 Q 20 20, 30 22 Z" fill="#FF69B4" stroke="#1A1A1A" strokeWidth="1" />
              <path d="M 70 15 Q 75 10, 80 15 Q 80 20, 70 22 Z" fill="#FF69B4" stroke="#1A1A1A" strokeWidth="1" />
            </>
          )}
          {hatType === 'flower' && (
            <>
              <circle cx="50" cy="10" r="5" fill="#FF1493" />
              <circle cx="45" cy="8" r="3" fill="#FFD700" />
              <circle cx="55" cy="8" r="3" fill="#FFD700" />
            </>
          )}
          {/* Eyes - Girl */}
          <circle cx="40" cy="35" r="3.5" fill="#1A1A1A" />
          <circle cx="60" cy="35" r="3.5" fill="#1A1A1A" />
          {/* Smile */}
          <path d="M 40 48 Q 50 52, 60 48" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          {/* Body - Girl Dress */}
          <ellipse cx="50" cy="75" rx="18" ry="25" fill={outfitColor} stroke="#1A1A1A" strokeWidth="2" />
          {/* Arms */}
          <rect x="12" y="72" width="18" height="10" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" rx="5" />
          <rect x="70" y="72" width="18" height="10" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" rx="5" />
          {/* Legs */}
          <line x1="42" y1="100" x2="42" y2="135" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="58" y1="100" x2="58" y2="135" stroke="#1A1A1A" strokeWidth="3" />
        </svg>
      </div>
    );
  } else {
    // Boy or neutral
    return (
      <div style={getAnimationStyle()}>
        <svg viewBox="0 0 100 150" style={{ width: size, height: size }}>
          {/* Head */}
          <circle cx="50" cy="40" r="25" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" />
          {/* Hair */}
          <path
            d="M 25 40 Q 25 10, 50 15 Q 75 10, 75 40"
            fill={hairColor}
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Hat */}
          {hatType === 'cap' && (
            <path d="M 30 25 Q 50 15, 70 25 L 65 30 Q 50 22, 35 30 Z" fill="#333" stroke="#1A1A1A" strokeWidth="1" />
          )}
          {hatType === 'crown' && (
            <>
              <path d="M 25 20 L 35 5 L 50 10 L 65 5 L 75 20" fill="#FFD700" stroke="#1A1A1A" strokeWidth="2" />
              <circle cx="50" cy="5" r="3" fill="#FF1493" />
            </>
          )}
          {/* Eyes */}
          <circle cx="40" cy="35" r="3" fill="#1A1A1A" />
          <circle cx="60" cy="35" r="3" fill="#1A1A1A" />
          {/* Smile */}
          <path d="M 40 45 Q 50 50, 60 45" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          {/* Body */}
          <rect x="35" y="65" width="30" height="35" fill={outfitColor} stroke="#1A1A1A" strokeWidth="2" rx="5" />
          {/* Arms */}
          <rect x="15" y="70" width="20" height="12" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" />
          <rect x="65" y="70" width="20" height="12" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" />
          {/* Legs */}
          <rect x="38" y="100" width="10" height="35" fill="#2C3E50" stroke="#1A1A1A" strokeWidth="2" />
          <rect x="52" y="100" width="10" height="35" fill="#2C3E50" stroke="#1A1A1A" strokeWidth="2" />
        </svg>
      </div>
    );
  }
}

export default AnimatedAvatar;
