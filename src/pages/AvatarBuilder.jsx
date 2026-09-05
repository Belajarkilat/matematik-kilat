import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import RobloxAvatar from '../components/RobloxAvatar';

function AvatarBuilder({ profile }) {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(profile.avatar || {
    gender: 'neutral', // 'boy', 'girl'
    skinColor: '#f4c4a0',
    faceColor: '#f4c4a0',
    hairColor: '#8B4513',
    hatType: 'none',
    outfitColor: '#FF6B35'
  });

  const skinOptions = [
    { color: '#f4c4a0', label: 'Fair' },
    { color: '#e8a876', label: 'Light' },
    { color: '#d4a574', label: 'Medium' },
    { color: '#c9915d', label: 'Tan' },
    { color: '#8B4513', label: 'Brown' },
    { color: '#654321', label: 'Dark' }
  ];

  const outfitColors = [
    { color: '#FF6B35', label: 'Orange' },
    { color: '#3498DB', label: 'Blue' },
    { color: '#2ECC71', label: 'Green' },
    { color: '#F39C12', label: 'Yellow' },
    { color: '#9B59B6', label: 'Purple' },
    { color: '#E74C3C', label: 'Red' },
    { color: '#FF69B4', label: 'Hot Pink' },
    { color: '#FFB6C1', label: 'Light Pink' },
    { color: '#FF1493', label: 'Deep Pink' },
    { color: '#C71585', label: 'Violet Red' }
  ];

  const hairColors = [
    { color: '#8B4513', label: 'Brown' },
    { color: '#000000', label: 'Black' },
    { color: '#FFD700', label: 'Blonde' },
    { color: '#DC143C', label: 'Red' },
    { color: '#4B0082', label: 'Purple' }
  ];

  const hatOptions = [
    { type: 'none', label: '❌ Tiada' },
    { type: 'cap', label: '🧢 Cap' },
    { type: 'crown', label: '👑 Crown' },
    { type: 'beanie', label: '🎩 Beanie' },
    { type: 'bow', label: '🎀 Bow' },
    { type: 'flower', label: '🌸 Flower' }
  ];

  const handleSave = () => {
    const ps = getProfileService();
    ps.updateAvatar(profile.id, avatar);
    navigate('/hub');
  };

  // Render avatar based on gender
  const AvatarPreview = () => {
    // Use the new Roblox-style avatar
    const profilePreview = {
      avatar: {
        gender: avatar.gender,
        skinColor: avatar.skinColor,
        hairColor: avatar.hairColor,
        outfitColor: avatar.outfitColor,
        faceType: 'happy'
      }
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RobloxAvatar profile={profilePreview} size={140} />
      </div>
    );
  };

  // OLD AVATAR CODE - keeping as reference but not used
  const AvatarPreviewOld = () => {
    if (avatar.gender === 'boy') {
      return (
        <svg viewBox="0 0 100 150" style={{ width: '120px', height: '180px' }}>
          {/* Head */}
          <circle cx="50" cy="40" r="25" fill={avatar.skinColor} stroke="#1A1A1A" strokeWidth="2" />

          {/* Hair */}
          <path
            d="M 25 40 Q 25 10, 50 15 Q 75 10, 75 40"
            fill={avatar.hairColor}
            stroke="#1A1A1A"
            strokeWidth="2"
          />

          {/* Hat - Boy */}
          {avatar.hatType === 'cap' && (
            <path d="M 30 25 Q 50 15, 70 25 L 65 30 Q 50 22, 35 30 Z" fill="#333" stroke="#1A1A1A" strokeWidth="1" />
          )}
          {avatar.hatType === 'crown' && (
            <>
              <path d="M 25 20 L 35 5 L 50 10 L 65 5 L 75 20" fill="#FFD700" stroke="#1A1A1A" strokeWidth="2" />
              <circle cx="50" cy="5" r="3" fill="#FF1493" />
            </>
          )}
          {avatar.hatType === 'beanie' && (
            <path d="M 28 20 Q 50 5, 72 20 L 70 35 Q 50 40, 30 35 Z" fill="#8338EC" stroke="#1A1A1A" strokeWidth="2" />
          )}

          {/* Eyes */}
          <circle cx="40" cy="35" r="3" fill="#1A1A1A" />
          <circle cx="60" cy="35" r="3" fill="#1A1A1A" />

          {/* Smile */}
          <path d="M 40 45 Q 50 50, 60 45" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

          {/* Body - Boy Shirt */}
          <rect x="35" y="65" width="30" height="35" fill={avatar.outfitColor} stroke="#1A1A1A" strokeWidth="2" rx="5" />

          {/* Arms */}
          <rect
            x="15"
            y="70"
            width="20"
            height="12"
            fill={avatar.skinColor}
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          <rect
            x="65"
            y="70"
            width="20"
            height="12"
            fill={avatar.skinColor}
            stroke="#1A1A1A"
            strokeWidth="2"
          />

          {/* Legs - Boy Pants */}
          <rect x="38" y="100" width="10" height="35" fill="#2C3E50" stroke="#1A1A1A" strokeWidth="2" />
          <rect x="52" y="100" width="10" height="35" fill="#2C3E50" stroke="#1A1A1A" strokeWidth="2" />
        </svg>
      );
    } else {
      // Girl avatar
      return (
        <svg viewBox="0 0 100 150" style={{ width: '120px', height: '180px' }}>
          {/* Head */}
          <circle cx="50" cy="40" r="25" fill={avatar.skinColor} stroke="#1A1A1A" strokeWidth="2" />

          {/* Hair - Girl Long Hair */}
          <path
            d="M 25 40 Q 25 10, 50 15 Q 75 10, 75 40 Q 75 50, 50 65 Q 25 50, 25 40 Z"
            fill={avatar.hairColor}
            stroke="#1A1A1A"
            strokeWidth="2"
          />

          {/* Hat/Accessory - Girl */}
          {avatar.hatType === 'bow' && (
            <>
              <path d="M 30 15 Q 25 10, 20 15 Q 20 20, 30 22 Z" fill="#FF69B4" stroke="#1A1A1A" strokeWidth="1" />
              <path d="M 70 15 Q 75 10, 80 15 Q 80 20, 70 22 Z" fill="#FF69B4" stroke="#1A1A1A" strokeWidth="1" />
            </>
          )}
          {avatar.hatType === 'flower' && (
            <>
              <circle cx="50" cy="10" r="5" fill="#FF1493" />
              <circle cx="45" cy="8" r="3" fill="#FFD700" />
              <circle cx="55" cy="8" r="3" fill="#FFD700" />
            </>
          )}
          {avatar.hatType === 'crown' && (
            <>
              <path d="M 25 20 L 35 5 L 50 10 L 65 5 L 75 20" fill="#FFD700" stroke="#1A1A1A" strokeWidth="2" />
              <circle cx="50" cy="5" r="3" fill="#FF1493" />
            </>
          )}

          {/* Eyes - Girl */}
          <circle cx="40" cy="35" r="3.5" fill="#1A1A1A" />
          <circle cx="60" cy="35" r="3.5" fill="#1A1A1A" />
          {/* Eyelashes */}
          <line x1="40" y1="32" x2="40" y2="28" stroke="#1A1A1A" strokeWidth="1" />
          <line x1="60" y1="32" x2="60" y2="28" stroke="#1A1A1A" strokeWidth="1" />

          {/* Smile */}
          <path d="M 40 48 Q 50 52, 60 48" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

          {/* Body - Girl Dress */}
          <ellipse cx="50" cy="75" rx="18" ry="25" fill={avatar.outfitColor} stroke="#1A1A1A" strokeWidth="2" />

          {/* Arms - Girl */}
          <rect
            x="12"
            y="72"
            width="18"
            height="10"
            fill={avatar.skinColor}
            stroke="#1A1A1A"
            strokeWidth="2"
            rx="5"
          />
          <rect
            x="70"
            y="72"
            width="18"
            height="10"
            fill={avatar.skinColor}
            stroke="#1A1A1A"
            strokeWidth="2"
            rx="5"
          />

          {/* Legs - Girl Skirt/Pants */}
          <line x1="42" y1="100" x2="42" y2="135" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="58" y1="100" x2="58" y2="135" stroke="#1A1A1A" strokeWidth="3" />
        </svg>
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card card--primary" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>Customize Your Avatar</h1>
          <p>Pilih gender, warna & accessories!</p>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Preview</h2>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <AvatarPreview />
          </div>

          {/* Gender Selection */}
          <h3>Gender</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => setAvatar({ ...avatar, gender: 'boy' })}
              className={avatar.gender === 'boy' ? 'btn btn--primary' : 'btn btn--ghost'}
              style={{ padding: '12px' }}
            >
              👦 Boy
            </button>
            <button
              onClick={() => setAvatar({ ...avatar, gender: 'girl' })}
              className={avatar.gender === 'girl' ? 'btn btn--primary' : 'btn btn--ghost'}
              style={{ padding: '12px' }}
            >
              👧 Girl
            </button>
          </div>

          {/* Skin Color Selection */}
          <h3>Skin Tone</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {skinOptions.map((option) => (
              <button
                key={option.color}
                onClick={() => setAvatar({ ...avatar, skinColor: option.color, faceColor: option.color })}
                title={option.label}
                style={{
                  width: '100%',
                  height: '50px',
                  background: option.color,
                  border: avatar.skinColor === option.color ? '4px solid #1A1A1A' : '2px solid #1A1A1A',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.8rem',
                  color: '#1A1A1A',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Hair Color Selection */}
          <h3>Hair Color</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {hairColors.map((option) => (
              <button
                key={option.color}
                onClick={() => setAvatar({ ...avatar, hairColor: option.color })}
                title={option.label}
                style={{
                  width: '100%',
                  height: '50px',
                  background: option.color,
                  border: avatar.hairColor === option.color ? '4px solid white' : '2px solid white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            ))}
          </div>

          {/* Outfit Color Selection - WITH PINK OPTIONS! */}
          <h3>👗 Outfit Color (Includes Pink for Girls!)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {outfitColors.map((option) => (
              <button
                key={option.color}
                onClick={() => setAvatar({ ...avatar, outfitColor: option.color })}
                title={option.label}
                style={{
                  width: '100%',
                  height: '50px',
                  background: `linear-gradient(135deg, ${option.color}, ${option.color}dd)`,
                  border: avatar.outfitColor === option.color ? '4px solid #1A1A1A' : '2px solid #1A1A1A',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Hat/Accessory Selection */}
          <h3>Hat / Accessory</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {hatOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => setAvatar({ ...avatar, hatType: option.type })}
                className={avatar.hatType === option.type ? 'btn btn--primary' : 'btn btn--ghost'}
                style={{ padding: '10px' }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button onClick={handleSave} className="btn btn--primary btn--block" style={{ marginTop: '20px' }}>
            ✓ Simpan & Main!
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarBuilder;
