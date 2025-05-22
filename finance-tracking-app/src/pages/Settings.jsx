import React, { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    currency: 'USD',
    name: '',
    email: '',
    notifications: true,
  });

  // Load settings from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem('userSettings');
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Settings / Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Default Currency</label>
          <input type="text" className="form-control" name="currency" value={settings.currency} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={settings.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={settings.email} onChange={handleChange} />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" name="notifications" checked={settings.notifications} onChange={handleChange} />
          <label className="form-check-label">Notifications for overspending</label>
        </div>
        <button type="submit" className="btn btn-primary">Save Settings</button>
      </form>
    </div>
  );
}

export default Settings;
