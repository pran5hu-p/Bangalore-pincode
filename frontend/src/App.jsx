import { useState } from 'react';
import axios from 'axios';
import { Search, MapPin } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setResults([]);
    
    try {
      const res = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      setResults(res.data);
      if(res.data.length === 0) setError('No locations found for this query.');
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1a1a1a' }}>📍 Bangalore Pincode Explorer</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Search by area name (e.g., Indiranagar) or 6-digit Pincode
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter pincode or area name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', outline: 'none' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '0 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {loading ? '...' : <Search size={20} />}
        </button>
      </form>

      {error && <div style={{ color: '#ef4444', textAlign: 'center', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {results.map((item, index) => (
          <div key={index} style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
            <div>
              <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '18px' }}>{item.location}</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{item.district}, {item.state}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e2e8f0', padding: '6px 12px', borderRadius: '6px', fontWeight: '600', color: '#334155' }}>
              <MapPin size={16} />
              {item.pincode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;