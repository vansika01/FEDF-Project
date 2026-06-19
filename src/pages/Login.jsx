import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const { login, quickLogin } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (userId) => {
    setError('');
    setIsLoading(true);
    try {
      await quickLogin(userId);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-page">
      <div className="login-box">
        <div className="login-logo">✈ GCOMS</div>
        <p className="login-sub">Ground Crew Operations Management System</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>
        
        {error && <div className="login-err" style={{ display: 'block' }}>{error}</div>}
        
        <div className="quick-logins">
          <p>Quick Login</p>
          <div className="quick-grid">
            <div className="quick-btn" onClick={() => handleQuickLogin('supervisor1')}>
              <span className="qname">Sarah Mitchell</span><span className="qrole">Supervisor</span>
            </div>
            <div className="quick-btn" onClick={() => handleQuickLogin('crew1')}>
              <span className="qname">Raj Sharma</span><span className="qrole">Ground Crew</span>
            </div>
            <div className="quick-btn" onClick={() => handleQuickLogin('crew2')}>
              <span className="qname">Priya Nair</span><span className="qrole">Ground Crew</span>
            </div>
            <div className="quick-btn" onClick={() => handleQuickLogin('crew3')}>
              <span className="qname">Arjun Patel</span><span className="qrole">Ground Crew</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
