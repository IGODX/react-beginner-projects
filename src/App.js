import React from 'react';
import './index.scss';
import {Collection} from './Collection'

const cats=[
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const category = categoryId ? `category=${categoryId}` : ''
  
  React.useEffect(()=>{
    setIsLoading(true);
    fetch(`https://658ac14fba789a962237bb98.mockapi.io/api/asd/collections?page=${page}&${category}&limit=3`)
    .then((res)=> res.json())
    .then((json)=> setCollections(json))
    .catch(err=> console.warn(err))
    .finally(()=>setIsLoading(false));
  }, [categoryId, page])
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
        {
          cats.map((obj, index)=>(
            <li onClick={()=> setCategoryId(index)} className={categoryId == index ? "active" : ''} key={obj.name}>{obj.name}</li>
          ))
        }
        </ul>
        <input value={searchValue} onChange={e=> setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
  {isLoading ? (<h2>Идёт загрузка</h2>) : collections.filter(obj=>{
    return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
  }).map((obj) => (
    <Collection
      key={obj.id} 
      name={obj.name}
      images={obj.photos}
    />
  ))}
</div>

      <ul className="pagination">
        {
          [...Array(5)].map((_,i)=>(
            <li onClick={()=> setPage(i)} className={page == i ? 'active' : ''}>{i + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
