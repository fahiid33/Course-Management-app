import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCourse: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [schedule, setSchedule] = useState('');
  const navigate = useNavigate();

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
        console.log('token generated in create course:', token);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/courses/create`, 
        {
          title,
          description,
          instructor,
          schedule,
        }, 
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Error creating course', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <form onSubmit={handleCreateCourse}>
        <input 
          type="text" 
          placeholder="Title*" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-2 mb-4 w-full"
          required
        />
        <textarea 
          placeholder="Description*" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border p-2 mb-4 w-full"
          required
        />
        <input 
          type="text" 
          placeholder="Instructor*" 
          value={instructor} 
          onChange={(e) => setInstructor(e.target.value)} 
          className="border p-2 mb-4 w-full"
          required
        />
        <input 
          type="text" 
          placeholder="Schedule*"
          value={schedule} 
          onChange={(e) => setSchedule(e.target.value)} 
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
