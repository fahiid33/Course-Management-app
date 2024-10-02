import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CourseDetails: React.FC = () => {
    console.log('CourseDetails');
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { title, description, instructor, schedule } = location.state || {};

  if (!location.state) {
    return <div>Error: No course data found.</div>; // In case state is missing
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-4">{description}</p>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Instructor</h2>
          <p className="text-gray-600">{instructor}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <p className="text-gray-600">{schedule}</p>
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            onClick={() => window.history.back()}
          >
            Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
