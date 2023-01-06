import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {


  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios.get('https://randomuser.me/api/?results=100')
  //     .then(res => setData(res.data.results));
  // }, [])

  // console.log(data);
  const [rice, setRice] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
    params: { ingr: 'apple' },
    headers: {
      'X-RapidAPI-Key': '9eaa2a4320msheb344641ce08f70p1142b1jsnd7be46274f54',
      'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
    }
  };

  // axios.request(options).then(response => {
  //   setRice(response.data.hints);
  // }).catch(function (error) {
  //   console.error(error);
  // });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        axios.request(options).then(response => {
          setRice(response.data.hints);
        })

      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
     

      {rice.map((val, idx) => (
        <div key={idx} className="info">
          <h5 className='h5'>{val.food.label}</h5>
          <h5 className='h5'>{val.food.nutrients.ENERC_KCAL} Cal</h5>
          <img
            src={val.food.image}
            style={{ width: '70%', }}
            alt={val.food.label}
          />
        </div>
      ))}


    </div>
  );
}

export default App;
