import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {


  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=100')
      .then(res => setData(res.data.results));
  }, [])

  console.log(data);

  return (
    <div className="App">
      {data.map((val, idx) => (
        <div key={idx} className="info">
          <img src={val.picture.large} />
          <h5 className='h5'>{val.name.title}. {val.name.first} {val.name.last}</h5>
          <h5 className='h5'>Country {val.location.country}</h5>
          <img
            src={'https://countryflagsapi.com/png/' + val.location.country}
            style={{width:'10rem', height:'6rem'}}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
