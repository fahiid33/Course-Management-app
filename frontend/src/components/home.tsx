import React, { useEffect, useState } from 'react';
import { fetchCourses, fetchSearchResults } from '../utils/seachUtils';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

  const [courses, setCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      fetchSearchResults(searchTerm, currentPage, limit)
        .then(({ searchResults, totalPages }: { searchResults: any[], totalPages: number }) => {
          setSearchResults(searchResults);
          setTotalPages(totalPages);
        })
        .catch((error: unknown) => console.error(error));
    } else {
      fetchCourses(currentPage, limit)
        .then(({ courses, totalPages }: {courses: any[], totalPages: number })=> {
          setCourses(courses);
          setTotalPages(totalPages);
        })
        .catch((error : unknown) => console.error(error));
    }
  }, [currentPage, isSearching, searchTerm]);

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
    setCurrentPage(1); // Reset to page 1 on new search
    setIsSearching(true);
  };

  const resetSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
    setSearchTerm('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      resetSearch();
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

  <div className="flex justify-between items-center mb-4">
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        placeholder="Search by title or instructor"
        value={searchTerm}
        onChange={handleInputChange}
        className="border rounded p-2 w-full mr-2"
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!searchTerm}
      >
        Search
      </button>
    </form>
    <button 
      onClick={() => navigate('/create')} // Replace with your route to the create course page
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Create Course
       </button>
      </div>

      <div className="flex-grow">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isSearching ? (
            searchResults.map((course) => (
                <div
                  key={course._id}
                  className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleCourseClick(course)}
                >
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p>{course.description}</p>
                </div>
            ))
        ) : (
            courses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleCourseClick(course)}
                >
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p>{course.description}</p>
                </div>
              ))
            )}
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
