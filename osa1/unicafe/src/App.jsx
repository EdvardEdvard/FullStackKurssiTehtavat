import { useState } from "react";

//======== COMPONENTS ============


const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const StatisticLine = ({ label, value }) => {
  return(
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
};

//======== FUNCTIONS ============

/*
ABOUT INCREMENT HANDLER

incrementHandler → OUTER FUNCTION
│
├─ Purpose: Accepts any setter, makes the handler reusable
│
└─ Returns → INNER FUNCTION
      │
      ├─ Arguments: none ()
      │
      ├─ Purpose: Ready for event callbacks (e.g., onClick)
      │          Prevents immediate execution
      │
      └─ Calls → UPDATER FUNCTION 
            │
            ├─ Definition: value => value + 1
            │
            ├─ Purpose: Receives current state and returns new state
            │
            └─ Handles safe state incrementing in React
*/

const incrementHandler = (setValue) => () => setValue(value => value + 1);


const getTotal = (good, neutral, bad) => good + neutral + bad;

const getAverage = (good, neutral, bad) => {
  const total = good + neutral + bad;
  if (total === 0) return 0;
  return ((good - bad) / total).toFixed(1);
};

const getPositivePercentage = (good, neutral, bad) => {
  const total = good + neutral + bad;
  if (total === 0) return 0;
  return ((good / total) * 100).toFixed(1);
};

//======== STATISTICS COMPONENT ============


const Statistics = ({ labels, good, neutral, bad }) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>

  }

  return (
    <table>
      <tbody>
        <StatisticLine label={labels[0]} value={good} />
        <StatisticLine label={labels[1]} value={neutral} />
        <StatisticLine label={labels[2]} value={bad} />
        <StatisticLine label={labels[3]} value={getTotal(good, neutral, bad)} />
        <StatisticLine label={labels[4]} value={getAverage(good, neutral, bad)} />
        <StatisticLine label={labels[5]} value={getPositivePercentage(good, neutral, bad) + " %"} />
      </tbody>
    </table>
  );
};

//======== APP ============


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const labels = [
    "good",            //0
    "neutral",         //1
    "bad",             //2
    "all",             //3
    "average",         //4
    "positive",        //5
  ];

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button label={labels[0]} onClick={incrementHandler(setGood)} />
      <Button label={labels[1]} onClick={incrementHandler(setNeutral)} />
      <Button label={labels[2]} onClick={incrementHandler(setBad)} />
      <h1>Statistics</h1>
      <Statistics labels={labels} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
