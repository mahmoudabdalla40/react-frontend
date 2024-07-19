import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ExamDetail = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    // Mock data for a specific exam
    const mockExam = { id: examId, title: 'Math Exam', description: 'A detailed math exam.' };
    setExam(mockExam);
  }, [examId]);

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{exam.title}</h2>
      <p>{exam.description}</p>
      <button>Start Exam</button>
    </div>
  );
};

export default ExamDetail;
