import { useState, useEffect } from 'react'


function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://127.0.0.1:8000');
      setData(data.json())
    }
    fetchData();
  }, [])

  return (
    <>
      <div>
        <p>{data}</p>
      </div>
    </>
  )
}

export default App
