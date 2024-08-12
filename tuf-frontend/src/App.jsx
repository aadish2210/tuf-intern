import React from 'react'
import Header from './components/Header'
import Body from './components/Body'

const App = () => {
  return (
    <div className='md:max-w-[80vw] m-auto md:p-10 p-5 overflow-y-auto'>
      <Header/>
      <Body/>
    </div>
  )
}

export default App