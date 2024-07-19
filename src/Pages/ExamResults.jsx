import React, { useEffect, useState } from 'react';

const ExamResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch exam results from API
    fetch('/api/results')
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching results:', error));
  }, []);

  return (
    <div>
      <h2>Exam Results</h2>
      <ul>
        {results.map(result => (
          <li key={result.id}>
            {result.examTitle}: {result.score}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamResults;
