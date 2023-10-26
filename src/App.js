import { useEffect, useRef, useState } from "react";

const data = [
  {
    id: 1,
    title: 'Muz',
  },
  {
    id: 2,
    title: 'muzlu Süt',
  },
  {
    id: 3,
    title: 'Çilek',
  },
  {
    id: 4,
    title: 'çilekli süt',
  },
  {
    id: 5,
    title: 'Kahve',
  },
  {
    id: 6,
    title: 'Filtre kahve',
  },
  {
    id: 7,
    title: 'Soğuk Filtre Kahve'
  }
]

function App() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(false)
  const searchRef = useRef()

  const isTyping = search.replace(/\s+/, '').length > 0;


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [])

  const handleClickOutSide = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearch('')
    }
  }

  useEffect(() => {
    if (isTyping) {
      const filterResult = data.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      setResult(filterResult.length > 0 ? filterResult : false)
    } else {
      setResult(false)
    }
  }, [search])
  return (
    <div className="container">
      {/* inputa value vermezsek içindeki yazı silinmez. */}
      <h5 style={{ marginBottom: "20px" }}>Arayabileceğiniz datalar</h5>
      <div className="datalar">{data.map(item => (
        <div className="child" key={item.id}>* {item.title}</div>
      ))}</div>
      <div className="search" ref={searchRef}>
        <input type='text' value={search} className={isTyping ? 'typing' : null} placeholder="Arama Yap" onChange={(e) => setSearch(e.target.value)} />
        {isTyping && (
          <div className="search-result">
            {result && result.map(item => (
              <div key={item.id} className="search-result-item">
                <p>{item.title}</p>
              </div>
            ))}
            {!result && (
              <div className="result-not-found">
                "{search}" ile ilgili bilgi bulamadık!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
