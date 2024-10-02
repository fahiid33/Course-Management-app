import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [instructor, setInstructor] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/courses?page=${currentPage}&limit=${limit}`);
        setCourses(response.data.courses);
        const totalCount = response.data.totalCount;
        setTotalPages(Math.ceil(totalCount / limit)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/courses/search?title=${searchTerm}&instructor=${instructor}`);
      setCourses(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  const handleCourseClick = (course: any) => {
    navigate(`/details`, {
      state: {
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        schedule: course.schedule,
      },
    });
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search by title or instructor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full md:w-1/3 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => handleCourseClick(course)}
            >
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
