const Header = ({otsikko}) => {
  return (
    <>
      <h1>{otsikko.name}</h1>
    </>
  )
}

const Content = ({taulukko}) => {
  return (
    <>
      <Part osa={taulukko.parts[0].name} tehtavatYht={taulukko.parts[0].exercises}/>
      <Part osa={taulukko.parts[1].name} tehtavatYht={taulukko.parts[1].exercises}/>
      <Part osa={taulukko.parts[2].name} tehtavatYht={taulukko.parts[2].exercises}/>
    </>
  )
}

const Part = ({osa, tehtavatYht}) => {
  return (
    <>
      <p> {osa} {tehtavatYht} </p>
    </>
  )
}

const Total = ({lasku}) => {
  return (
    <>
      <p>Number of exercises {lasku.parts[0].exercises + lasku.parts[1].exercises + lasku.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header otsikko={course} />
      <Content taulukko={course}/> 
      <Total lasku={course} />
    </div>
  )
}

export default App


/*

TÄSSÄ TESTAILIN TAULUKKOJA --IGNORE

const Header = (props) => {
  return (
    <>
      <h1>{props.otsikko}</h1>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <p>{props.osa} {props.tehtavatYht}</p>
    </>
  )
}
// Tehtävänannon Lisäksi on komponentti joka laskee harjoitukset taulukko summan.
const Total = (props) => {
  const summa = props.summa.reduce((yhtArv, nykArv) => yhtArv + nykArv, 0);
  return (
    <>
      <p>Number of exercises {summa}</p>
    </>
  )
}

// Tehtävänannon lisäksi refaktoroin osat ja harjoiutkset taulukoiksi. 
const App = () => {
  const course = 'Half Stack application development'
  const part = ['Fundamentals of React', 'Using props to pass data', 'State of a component'];
  const exercises = [10, 7, 14];


  return (
    <div>
      <Header otsikko={course} />
      <Content osa={part[0]} tehtavatYht={exercises[0]}/>
      <Content osa={part[1]} tehtavatYht={exercises[1]}/>
      <Content osa={part[2]} tehtavatYht={exercises[2]}/>
      <Total summa={exercises}/>
    </div>
  )
}

export default App
*/