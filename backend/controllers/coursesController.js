import * as coursesModel from '../models/coursesModel.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await coursesModel.getAllCourses();
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
