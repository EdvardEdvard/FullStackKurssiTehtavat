import { useState } from 'react';

//======== COMPONENTS ============

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const AnecdoteDisplay = ({ anecdotes, selectedIndex }) => (
  <p>{anecdotes[selectedIndex].text}</p>
);

const VoteCount = ({ anecdotes, selectedIndex }) => (
  <p>{"has " + anecdotes[selectedIndex].votes + " votes"}</p>
);

const MostVotedAnecdoteDisplay = ({ anecdote }) => (
  <>
    <p>{anecdote.text}</p>
    <p>{"has " + anecdote.votes + " votes"}</p>
  </>
);



//============= FUNCTIONS ==========

const getRandomIndex = (currentIndex, arrayLength) => {
  if (arrayLength < 2) return currentIndex;
  let newIndex = currentIndex;
  while (newIndex === currentIndex) {
    newIndex = Math.floor(Math.random() * arrayLength);
  }
  return newIndex;
};


const getMostVotedAnecdote = (anecdoteList) => {
  if (anecdoteList.length === 0) return null;

  let highestVotes = anecdoteList[0].votes;
  let mostVotedAnecdote = anecdoteList[0];

  for (let i = 1; i < anecdoteList.length; i++) {
    if (anecdoteList[i].votes > highestVotes) {
      highestVotes = anecdoteList[i].votes;
      mostVotedAnecdote = anecdoteList[i];
    }
  }

  return mostVotedAnecdote;
};
//============= HANDLERS ==========



// Tämä funktio luo vote handlerin, joka kasvattaa valitun anekdootin ääniä
// Se ottaa kaksi syötettä:
// 1. setAnecdotes - funktio, jolla päivitetään anekdoottien lista (useState:stä)
// 2. selectedIndex - indeksi nykyisestä valitusta anekdootista
// Luodaan funktio, joka palauttaa äänestysnapin käsittelijäfunktion (vote handler)
// Tämä tehdään sulkeutumisella (closure), jotta handler muistaa valitun anekdootin indeksin
const createVoteHandler = (setAnecdotes, selectedIndex) => () => {
  // Kutsutaan setAnecdotes-päivitysfunktiota
  // Käytetään funktionaalista päivitystä (prevAnecdotes => ...), jotta saadaan aina tuorein tila
  setAnecdotes(prevAnecdotes => 
    // Käydään läpi jokainen anekdootti nykyisessä listassa map-funktiolla
    // Luodaan näin uusi taulukko, jossa vain valitun anekdootin votes kasvaa
    prevAnecdotes.map((anecdote, index) => {    
      // Tarkistetaan, onko tämä anekdootti se, jota käyttäjä äänesti
      if (index === selectedIndex) {
        // Jos on valittu, palautetaan uusi olio, jossa äänimäärä on kasvatettu yhdellä
        // Käytetään spread-syntaksia (...anecdote), jotta muut kentät säilyvät ennallaan
        return { ...anecdote, votes: anecdote.votes + 1 };
      }
      // Jos tämä ei ole valittu anekdootti, palautetaan se täysin muuttumattomana
      return anecdote;
    })
  );
};

const createNextHandler = (selectedIndex, setSelectedIndex, totalAnecdotes) => () => {
  const nextIndex = getRandomIndex(selectedIndex, totalAnecdotes);
  setSelectedIndex(nextIndex);
};

//============= APP =================
const App = () => {
  const initialAnecdotes = [
    { votes: 0, text: 'If it hurts, do it more often.' },
    { votes: 0, text: 'Adding manpower to a late software project makes it later!' },
    { votes: 0, text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.' },
    { votes: 0, text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' },
    { votes: 0, text: 'Premature optimization is the root of all evil.' },
    { votes: 0, text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.' },
    { votes: 0, text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.' },
    { votes: 0, text: 'The only way to go fast, is to go well.' }
  ];

  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDisplay anecdotes={anecdotes} selectedIndex={selectedIndex} />
      <VoteCount anecdotes={anecdotes} selectedIndex={selectedIndex} />
      <Button label="Next Anecdote" onClick={createNextHandler(selectedIndex, setSelectedIndex, anecdotes.length)} />
      <Button label="Vote" onClick={createVoteHandler(setAnecdotes, selectedIndex)} />
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdoteDisplay anecdote={getMostVotedAnecdote(anecdotes)} />
    </div>
  );
};

export default App;
