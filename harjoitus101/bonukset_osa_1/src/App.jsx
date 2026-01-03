import { useState } from 'react'



//_________OSA 1___________

const consoleLaskut = () => {
  console.log("- consoleLaskut")

  const x = 1
  let y = 5

  console.log(x, y)   // tulostuu 1 5
  y += 10
  console.log(x, y)   // tulostuu 1 15
  y = 'teksti'
  console.log(x, y)   // tulostuu 1 teksti

}

const consoleTaulukot = () => {
  console.log("- consoleTaulukot")

  const t = [1, -1, 3]
  const t2 = t.concat(5)
  const t3 = [1, 2, 3]
  const t4 = [1, 2, 3, 4, 5]
  const m1 = t3.map(value => value * 2)
  const m2 = t3.map(value => '<li>' + value + '</li>')

  console.log(t.length) // tulostuu 3
  console.log(t[1])     // tulostuu -1
  t.push(5)             // lisätään taulukkoon luku 5
  console.log(t.length) // tulostuu 4
  t.forEach(value => { console.log(value)})  // tulostuu 1, -1, 3, 5 omille riveilleen
  console.log(t)    // tulostuu [1, -1, 3]
  console.log(t2)   // tulostuu [1, -1, 3, 5]
  console.log(m1)   // tulostuu [2, 4, 6]
  console.log(m2)   // tulostuu [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]
  const [first, second, ...rest] = t4
  console.log(first, second)  // tulostuu 1 2
  console.log(rest)           // tulostuu [3, 4 ,5]

  }

const consoleObjektit = () => {
  console.log("- consoleObjektit")

  const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
  }

  const object2 = {
    name: 'Full Stack -websovelluskehitys',
    level: 'aineopinto',
    size: 5,
  }

  const object3 = {
    name: {
      first: 'Juha',
      last: 'Tauriainen',
    },
    grades: [2, 3, 5, 3],
    department: 'TKTL',
  }

  const fieldName = 'age' 
  object1.address = 'Tapiola'
  object1['secret number'] = 12341

  console.log(object1.name)          // tulostuu Arto Hellas
  console.log(object1[fieldName])    // tulostuu 35
  console.log(object1.address)
  console.log(object1["secret number"])
  console.log(object2.level)        
  console.log(object3.department)        
}

const consoleObjektienMetodit = () => {
  console.log("- consoleObjektienMetodit")

  const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
    greet: () => console.log('hello, my name is', arto.name),
    doAddition: (a, b) => console.log(a + b),
  }

  arto.growOlder = function() {this.age += 1}
  arto.greet()                           // tulostuu hello, my name is Arto Hellas
  console.log(arto.age)                  // tulostuu 35
  arto.growOlder()
  console.log(arto.age)                  // tulostuu 36
  arto.doAddition(1, 4)                  // tulostuu 5
  const referenceToAddition = arto.doAddition
  referenceToAddition(10, 15)             // tulostuu 25
  const referenceToGreet = arto.greet
  referenceToGreet()                      // tulostuu ainoastaan hello, my name is Arto Hellas (ARROW FUNKTIO TEKEE TOIMINNALLISE)
  setTimeout(arto.greet, 1000)            // sekunnin päästä tulostuu hello, my name is  (ARROW FUNKTIO TEKEE TOIMINNALLISE)
  setTimeout(arto.greet.bind(arto), 2000) // kahden sekunnin päästä tulostuu hello, my name is Arto Hellas
}


const HelloProps1 = (props) => {
  const name = props.name
  const age = props.age
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <strong>HelloProps1</strong>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const HelloProps2 =  ({ name, age })  => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <strong>HelloProps2</strong>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const HelloProps3 = (props) => {
  const { name, age } = props 
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <strong>HelloProps3</strong>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const Display = ({counter}) => (<p>Counted {counter} times</p>)
const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)
const History = (props) => (
  <div>
    {props.allClicks.length === 0
      ? 'the app is used by pressing the buttons'
      : `button press history: ${props.allClicks.join(' ')}`}
  </div>
)

const sum = (p1, p2) => p1 + p2
const square = p => p * p



const AppOsa1 = () => {

  console.log("TULOSTETAAN Osio 1")

  const friends = [
    { name: 'Leevi', age: 4 },
    { name: 'Venla', age: 10 },
  ]

  const nimi = 'Pekka'
  const ika = 10
  const result = sum(1, 5)
  const t = [1, 2, 3]

  consoleLaskut()
  consoleObjektit()
  consoleTaulukot()
  consoleObjektienMetodit()
  console.log("- consoleApp")
  console.log(result)
  const tSquared = t.map(square) // tSquared on nyt [1, 4, 9]
  console.log(tSquared)
  
  return (
    <div>
      <strong>-OSA 1-</strong>
      <h1>Greetings</h1>
      <HelloProps1 name="Maya" age={26 + 10} />
      <HelloProps2 name="Jask" age={11 + 19} />
      <HelloProps3 name={nimi} age={ika} />
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}

const App = () => {

  //Use state hooks
  const [renderer, setRenderer ] = useState(0)
  const [counter, setCounter ] = useState(0)
  const [show, setShow] = useState(false)
  const [clicks, setClicks] = useState({left: 0, right: 0})
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  //tilan päivittäjät
  const handleLeftClick = () => {                          // EI TURVALLINEN
    const newClicks = { ...clicks, left: clicks.left + 1 } // updated state object
    setClicks(newClicks)                                   // async state update
    setAll(allClicks.concat('L'))
    setTotal(newClicks.left + newClicks.right)
  }
  const handleRightClick = () => {
    setClicks(clicks => {
      const newClicks = { ...clicks, right: clicks.right + 1 }
      setTotal(newClicks.left + newClicks.right)
      return newClicks
    })
    setAll(allClicks => allClicks.concat('R'))
  }

  const increaseByOne = () => setCounter(counter + 1) // EI TURVALLINEN
  const increaseByTwo = () => setCounter(counter => counter + 2)
  const decreaseByOne = () => setCounter(counter => counter - 1)
  const decreaseByTwo = () => setCounter(counter => counter - 2)
  const toggleShow = () => setShow(prev => !prev);
  const setToZero = () => setCounter(0)
  
  setTimeout(() => setRenderer(renderer + 1), 60000) //renderöi joka 60 sec kerta
  console.log('rendering...', renderer, " times")

  return (
    <div>
      <button onClick={toggleShow}>toggle OSA 1</button>
      {show && (
          <div>
            <p> Refreshed {renderer} times. Rerender every 60 seconds.</p>
            <p>Counted {counter} times.</p>
            <AppOsa1 />
            <Display counter={counter}/>
            <Button onClick={() => console.log('clicked')} text='Console printer' />
            <div>
              <Button onClick={setToZero} text='zero'/>
              <Button onClick={increaseByOne} text='plus 1'/>
              <Button onClick={decreaseByOne} text='minus 1'/>
              <Button onClick={increaseByTwo} text='plus 2'/>
              <Button onClick={decreaseByTwo} text='minus 2'/>
            </div>
            <div>
              <p>Left clicks: {clicks.left}</p>
              <p>Right clicks: {clicks.right}</p>
              <Button onClick={handleLeftClick} text='right'/>
              <Button onClick={handleRightClick} text='left'/>
              <p>{allClicks.join(' ')}</p>
              <p>total {total}</p>
              <History allClicks={allClicks} />
            </div>
          </div>
        )}
    </div>
  )
}

export default App