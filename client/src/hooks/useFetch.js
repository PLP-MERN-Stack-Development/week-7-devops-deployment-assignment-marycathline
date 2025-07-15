import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    axios.get(url)
      .then((res) => {
        if (isMounted) {
          setData(res.data.data || []);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error fetching data');
          setData(null);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

