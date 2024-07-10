import Part from './Part';

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part key={part.id} part={parts[i]} />
      ))}
    </>
  );
};

export default Content;
