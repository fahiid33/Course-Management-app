import axios from 'axios';

export const fetchCourses = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses?page=${page}&limit=${limit}`);
    const courses = response.data.courses;
    const totalCount = response.data.totalCount;
    const totalPages = Math.ceil(totalCount / limit);
    return { courses, totalPages };
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const fetchSearchResults = async (searchTerm: string, page: number, limit: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/search?searchTerm=${searchTerm}&page=${page}&limit=${limit}`);
    const searchResults = response.data.courses;
    const totalCount = response.data.totalCount;
    const totalPages = Math.ceil(totalCount / limit);
    return { searchResults, totalPages };
  } catch (error) {
    console.error('Error searching courses:', error);
    throw error;
  }
};
