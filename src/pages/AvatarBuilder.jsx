import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import KilatAvatar from '../components/KilatAvatar';

/**
 * Reka avatar. Everything a child picks here is written straight to the
 * profile, so the preview is the figure they will see on every other screen.
 */

const RUPA = [
  { value: 'boy', label: 'Lelaki' },
  { value: 'girl', label: 'Perempuan' }
];

const WAJAH = [
  { value: 'smile', label: 'Senyum' },
  { value: 'excited', label: 'Ceria' },
  { value: 'cool', label: 'Selamba' }
];

const KULIT = [
  { color: '#F6D5B8', label: 'Cerah' },
  { color: '#E8B98F', label: 'Kuning langsat' },
  { color: '#D2A06A', label: 'Sawo matang' },
  { color: '#B57C4A', label: 'Coklat' },
  { color: '#8A5A32', label: 'Coklat tua' },
  { color: '#5E3A20', label: 'Gelap' }
];

const RAMBUT = [
  { color: '#1C1710', label: 'Hitam' },
  { color: '#3A2A1C', label: 'Coklat tua' },
  { color: '#6B4A2A', label: 'Coklat' },
  { color: '#B07B3E', label: 'Perang' },
  { color: '#C7363C', label: 'Merah' },
  { color: '#7A4DD4', label: 'Ungu' }
];

const BAJU = [
  { color: '#3E6FD9', label: 'Biru' },
  { color: '#148F5F', label: 'Hijau' },
  { color: '#C7363C', label: 'Merah' },
  { color: '#FFC300', label: 'Kuning' },
  { color: '#E2711D', label: 'Jingga' },
  { color: '#7A4DD4', label: 'Ungu' },
  { color: '#C2529E', label: 'Merah jambu' },
  { color: '#1F7FA8', label: 'Biru laut' }
];

const AKSESORI = [
  { type: 'none', label: 'Tiada' },
  { type: 'songkok', label: 'Songkok' },
  { type: 'tudung', label: 'Tudung' },
  { type: 'cap', label: 'Topi' },
  { type: 'beanie', label: 'Topi bulu' },
  { type: 'crown', label: 'Mahkota' },
  { type: 'bow', label: 'Reben' },
  { type: 'flower', label: 'Bunga' }
];

// Profiles made before this palette hold colours that are in no list any
// more, and they would leave every heading with nothing marked as chosen.
// Anything unrecognised falls back to the default for that field.
function onlyKnown(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function normalise(saved = {}) {
  return {
    gender: onlyKnown(saved.gender, RUPA.map((o) => o.value), 'boy'),
    faceType: onlyKnown(saved.faceType, WAJAH.map((o) => o.value), 'smile'),
    skinColor: onlyKnown(saved.skinColor, KULIT.map((o) => o.color), '#E8B98F'),
    hairColor: onlyKnown(saved.hairColor, RAMBUT.map((o) => o.color), '#3A2A1C'),
    outfitColor: onlyKnown(saved.outfitColor, BAJU.map((o) => o.color), '#3E6FD9'),
    hatType: onlyKnown(saved.hatType, AKSESORI.map((o) => o.type), 'none')
  };
}

function AvatarBuilder({ profile, onProfileChange }) {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(() => normalise(profile.avatar));

  const set = (patch) => setAvatar((prev) => ({ ...prev, ...patch }));

  const handleSave = () => {
    const updated = getProfileService().updateAvatar(profile.id, avatar);
    // Hand the fresh profile back up, or the Hub keeps drawing the old avatar
    // until the page is reloaded.
    if (onProfileChange) onProfileChange({ ...updated });
    navigate('/hub');
  };

  const Swatches = ({ options, selected, onPick, name }) => (
    <div className="swatches">
      {options.map((o) => (
        <button
          key={o.color}
          type="button"
          className={selected === o.color ? 'swatch swatch--on' : 'swatch'}
          onClick={() => onPick(o.color)}
          aria-pressed={selected === o.color}
          aria-label={`${name}: ${o.label}`}
        >
          <span className="swatch__chip" style={{ background: o.color }} />
          <span className="swatch__label">{o.label}</span>
        </button>
      ))}
    </div>
  );

  const Choices = ({ options, selected, onPick, keyName = 'value' }) => (
    <div className="choices">
      {options.map((o) => {
        const value = o[keyName];
        const on = selected === value;
        return (
          <button
            key={value}
            type="button"
            className={on ? 'choice choice--on' : 'choice'}
            onClick={() => onPick(value)}
            aria-pressed={on}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="page">
      <button className="back" onClick={() => navigate(-1)}>← Kembali</button>

      <div className="page__head">
        <div className="grow">
          <h1 className="page__title">Reka avatar</h1>
          <div className="page__sub">Pilih rupa, warna dan aksesori {profile.name}</div>
        </div>
      </div>

      <div className="stack">
        <section className="paper avatar-stage">
          <KilatAvatar profile={{ avatar }} size={150} />
        </section>

        <section className="card">
          <h2 className="field__head">Rupa</h2>
          <Choices options={RUPA} selected={avatar.gender} onPick={(v) => set({ gender: v })} />

          <h2 className="field__head">Riak wajah</h2>
          <Choices options={WAJAH} selected={avatar.faceType} onPick={(v) => set({ faceType: v })} />

          <h2 className="field__head">Warna kulit</h2>
          <Swatches
            options={KULIT}
            selected={avatar.skinColor}
            name="Warna kulit"
            onPick={(c) => set({ skinColor: c, faceColor: c })}
          />

          <h2 className="field__head">Warna rambut</h2>
          <Swatches
            options={RAMBUT}
            selected={avatar.hairColor}
            name="Warna rambut"
            onPick={(c) => set({ hairColor: c })}
          />

          <h2 className="field__head">Warna baju</h2>
          <Swatches
            options={BAJU}
            selected={avatar.outfitColor}
            name="Warna baju"
            onPick={(c) => set({ outfitColor: c })}
          />

          <h2 className="field__head">Aksesori kepala</h2>
          <Choices
            options={AKSESORI}
            selected={avatar.hatType}
            keyName="type"
            onPick={(v) => set({ hatType: v })}
          />
        </section>

        <button className="btn btn--go btn--block" onClick={handleSave}>
          Simpan &amp; main
        </button>
      </div>
    </div>
  );
}

export default AvatarBuilder;
