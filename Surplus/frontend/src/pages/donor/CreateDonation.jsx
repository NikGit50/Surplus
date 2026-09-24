import { useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true); // 1. Start loading
    setError(null);   // Clear previous errors

    try {
      const response = await fetch('https://api.example.com/data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      // 2. Catch any network errors or thrown exceptions
      setError(err.message);
    } finally {
      // 3. ALWAYS turn off loading, whether it succeeds or fails
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}