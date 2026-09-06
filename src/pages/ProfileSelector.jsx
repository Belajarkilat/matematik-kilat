import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import KilatMark from '../components/KilatMark';

function ProfileSelector({ onProfileChange }) {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const ps = getProfileService();
    const allProfiles = ps.getAllProfiles();
    setProfiles(allProfiles);

    // If no profiles exist, show new profile form
    if (allProfiles.length === 0) {
      setShowNewProfile(true);
    }
  }, []);

  const handleSelectProfile = (profile) => {
    const ps = getProfileService();
    ps.switchProfile(profile.id);
    onProfileChange(profile);
    navigate('/hub');
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    setError('');

    if (!newProfileName.trim()) {
      setError('Sila masukkan nama profil');
      return;
    }

    try {
      const ps = getProfileService();
      const newProfile = ps.createProfile(newProfileName);
      setProfiles([...profiles, newProfile]);
      setNewProfileName('');
      setShowNewProfile(false);
      onProfileChange(newProfile);
      navigate('/avatar');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProfile = (profileId) => {
    if (window.confirm('Adakah anda pasti ingin memadamkan profil ini?')) {
      const ps = getProfileService();
      ps.deleteProfile(profileId);
      setProfiles(profiles.filter(p => p.id !== profileId));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card card--primary" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <KilatMark size={76} />
          </div>
          <h1>Matematik Kilat</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Siapa nak belajar?</p>
        </div>

        {profiles.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Pilih Profil</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {profiles.map(profile => (
                <div
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    border: '4px solid #1A1A1A',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '4px 6px 0px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                      {profile.avatar?.skinColor ? '🎮' : '👤'}
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{profile.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Tahun {profile.level}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProfile(profile.id);
                      }}
                      style={{
                        padding: '8px 12px',
                        background: '#E74C3C',
                        color: 'white',
                        border: '2px solid #1A1A1A',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      Padam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showNewProfile ? (
          <div className="card">
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Profil Baru</h2>
            <form onSubmit={handleCreateProfile}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Nama
                </label>
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Masukkan nama"
                  maxLength={20}
                  autoFocus
                />
              </div>
              {error && <div style={{ color: '#E74C3C', marginBottom: '16px' }}>{error}</div>}
              <button type="submit" className="btn btn--primary btn--block" style={{ marginBottom: '8px' }}>
                Buat Profil
              </button>
              {profiles.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowNewProfile(false)}
                  className="btn btn--ghost btn--block"
                >
                  Batal
                </button>
              )}
            </form>
          </div>
        ) : (
          <button
            onClick={() => setShowNewProfile(true)}
            className="btn btn--primary btn--block"
            style={{ fontSize: '1.1rem' }}
          >
            + Profil Baru
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileSelector;
