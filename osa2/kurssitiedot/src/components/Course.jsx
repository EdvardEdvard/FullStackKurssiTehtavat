// src/components/Course.jsx

//==============COMPONENTS======================

const Course = ({ courseArrayData }) => {
  return (
    <>
      {courseArrayData.map((course) => (
        <div key={course.id}>
          <Header otsikko={course} />
          <Content taulukko={course} />
          <Total lasku={course} />
        </div>
      ))}
    </>
  );
};

const Content = ({ taulukko }) => {

  return (
    <>
      {taulukko.parts.map((p, i) => ( <Part key={i} osa={p.name} tehtavatYht={p.exercises} /> ))}
    </>
  );
};

//==============Helper COMPONENTS======================

const Header = ({otsikko}) => <h1>{otsikko.name}</h1>
const Part = ({osa, tehtavatYht}) => <p> {osa} {tehtavatYht} </p>
const Total = ({lasku}) =>  <strong>Number of exercises {getSum(lasku.parts.map(p => p.exercises))}</strong>;

//==============HELPER FUNCTIONS=========

const getSum = nums => nums.reduce((a, b) => a + b, 0);

// Vie moduuli ulos
export default Course