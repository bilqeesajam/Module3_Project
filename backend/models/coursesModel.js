import db from '../config/db.js';

export const getAllCourses = async () => {
  const [rows] = await db.query(
    `SELECT course_id, title, description, price, icon, image, details FROM courses`
  );

  // Convert details string to array
  return rows.map(course => ({
    ...course,
    details: course.details.split('|')
  }));
};