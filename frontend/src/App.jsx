import { useState } from 'react';
import axios from 'axios';
import { Search, MapPin, Map } from 'lucide-react';

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
      const res = await axios.get(`https://bangalore-pincode.onrender.com/api/search?query=${query}`);
      setResults(res.data);
      if(res.data.length === 0) setError('No locations found for this query.');
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 bg-slate-900 font-sans px-4">
      <div className="w-full max-w-2xl p-10 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        
        <div className="text-center mb-8">
          <h1 className="text-slate-50 mb-3 text-3xl flex items-center justify-center gap-3 font-bold">
            <Map className="text-sky-400" size={36} />
            Pincode Explorer
          </h1>
          <p className="text-slate-400 text-base">
            Search Bangalore areas or 6-digit postal codes
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="e.g., Indiranagar or 560038"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            className="flex-1 px-5 py-4 rounded-xl border border-slate-600 bg-slate-900 text-slate-50 text-base outline-none transition-colors focus:border-sky-400"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-7 bg-sky-400 text-slate-900 font-bold rounded-xl flex items-center justify-center transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? '...' : <Search size={22} />}
          </button>
        </form>

        {error && (
          <div className="text-red-300 text-center p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {results.map((item, index) => (
            <div 
              key={index} 
              className="p-5 border border-slate-700 rounded-xl flex justify-between items-center bg-slate-900 transition-all hover:-translate-y-1 hover:border-slate-600"
            >
              <div>
                <h3 className="mb-2 text-slate-50 text-xl font-semibold">{item.location}</h3>
                <p className="m-0 text-slate-400 text-sm">{item.district}, {item.state}</p>
              </div>
              <div className="flex items-center gap-2 bg-sky-400/10 px-4 py-2 rounded-lg font-semibold text-sky-400 text-lg">
                <MapPin size={20} />
                {item.pincode}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;