import React, { useState } from 'react'

//select a random index from array, omitting current index
const randomFromRemaining = (array, currentIndex) => {
  let newIndex = Math.floor(Math.random() * array.length)
  while(newIndex === currentIndex) {
    newIndex = Math.floor(Math.random() * array.length)
  }
    return newIndex
}

const FindMostVotes = (props) => {
  let mostVotes = 0
  let mostVotedQuote = 0
  for (let i=0; i<props.votes.length; i++) {
    if (props.votes[i] > mostVotes) {
      mostVotes = props.votes[i]
      mostVotedQuote = i
    }
  }
  if (mostVotes === 0) return <div/>
  return (
    <>
      <h1>anecdote with the most votes</h1>
      {props.quotes[mostVotedQuote]}
    </>
  )
}

const App = () => {
  const anecdotes = [
    '"Adding manpower to a late software project, makes it later."',
    '"Systems program building is an entropy-decreasing process, hence inherently metastable. Program maintenance is an entropy-increasing process, and even its most skillful execution only delays the subsidence of the system into unfixable obsolescence."',
    '"As time passes, the system becomes less and less well-ordered. Sooner or later the fixing cease to gain any ground. Each forward step is matched by a backward one. Although in principle usable forever, the system has worn out as a base for progress. ...A brand-new, from-the-ground-up redesign is necessary."',
    '"The general tendency is to over-design the second system, using all the ideas and frills that were cautiously sidetracked on the first one."',
    '"The programmer, like the poet, works only slightly removed from pure thought-stuff. He builds his castles in the air, from air, creating by exertion of the imagination."',
    '"The management question, therefore, is not whether to build a pilot system and throw it away. You will do that. The only question is whether to plan in advance to build a throwaway, or to promise to deliver the throwaway to customers."',
    '"Einstein repeatedly argued that there must be simplified explanations of nature, because God is not capricious or arbitrary. No such faith comforts the software engineer."',
    '"For the human makers of things, the incompletenesses and inconsistencies of our ideas become clear only during implementation."',
    '"The challenge and the mission are to find real solutions to real problems on actual schedules with available resources."',
    '"A basic principle of data processing teaches the folly of trying to maintain independent files in synchonism."',
    '"By documenting a design, the designer exposes himself to the criticisms of everyone, and he must be able to defend everything he writes. If the organizational structure is threatening in any way, nothing is going to be documented until it is completely defensible."',
    '"An omelette, promised in two minutes, may appear to be progressing nicely. But when it has not set in two minutes, the customer has two choices—wait or eat it raw. Software customers have had the same choices. The cook has another choice; he can turn up the heat. The result is often an omelette nothing can save—burned in one part, raw in another."',
    '"Organizations which design systems are constrained to produce systems which are copies of the communication structures of these organizations."',
    '"Conceptual integrity in turn dictates that the design must proceed from one mind, or from a very small number of agreeing resonant minds."',
    '"Adding manpower to a late software project makes it later."',
    '"Observe that for the programmer, as for the chef, the urgency of the patron may govern the scheduled completion of the task, but it cannot govern the actual completion."',
    '"Adjusting to the requirement for perfection is, I think, the most difficult part of learning to program."',
    '"In fact, flow charting is more preached than practiced. I have never seen an experienced programmer who routinely made detailed flow charts before beginning to write programs"',
    '"Study after study shows that the very best designers produce structures that are faster, smaller, simpler, cleaner, and produced with less effort. The differences between the great and the average approach an order of magnitude."',
    '"...give a great deal of attention to keeping his managers and his technical people as interchangeable as their talents allow. The barriers are sociological... To overcome this problem some laboratories, such as Bell Labs, abolish all job titles. Each professional employee is a member of technical staff."',
    '"Simplicity and straightforwardness proceed from conceptual integrity."',
    '"For the human makers of things, the incompletenesses and inconsistencies of our ideas become clear only during implementation. Thus it is that writing, experimentation, working out are essential disciplines for the theoretician."',
    '"When a child has learned this architecture, he can tell time as easily from a wristwatch as from a church tower."'
  ]
  const [selected, setSelected] = useState(0)

  //array of cast votes per anecdote, initialized to zero votes
  const [votes, castVotes] = useState(Array(anecdotes.length).fill(0))

  const nextQuote = () => {
    const newSelected = randomFromRemaining(anecdotes, selected)
    setSelected(newSelected)
  }
  
  function vote() {
    const copy = [...votes]
    copy[selected] += 1
    castVotes(copy)
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <button onClick={vote}>vote</button> &nbsp; 
      <button onClick={nextQuote}>next quote</button>
      <p/>
      {anecdotes[selected]} <b>({votes[selected]} votes)</b>
      <FindMostVotes quotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App