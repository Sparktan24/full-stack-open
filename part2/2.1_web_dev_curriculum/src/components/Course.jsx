import Header from './Header';
import Content from './Content';
import Total from './Total';

function Course({ course }) {
  //console.log(course.parts.exercises);
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default Course;
