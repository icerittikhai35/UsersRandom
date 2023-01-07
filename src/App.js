import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {


  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios.get('https://randomuser.me/api/?results=100')
  //     .then(res => setData(res.data.results));
  // }, [])

  // console.log(data);
  const [rice, setRice] = useState([]);
  const [dataInput, setDataInput] = useState("");
  const [loadingdataInput, setLoadingDataInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
    params: { ingr: 'pork' },
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
        alert('ไม่มีข้อมูล')
      }
      setLoading(false);
    }

    fetchData();
  }, []);




  //ปุ่มโหลด
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const [isLoading, setLoadingInput] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoadingInput(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoadingInput(true) && setDataInput("");

  return (
    <div className="App">
      <div className='BoxInput'>
        <h2>Search Kcal in Foods</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', }}>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Pork" value={dataInput}  />
              </Form.Group>
            </Form>
          </div>
          <div>
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? handleClick : null}
            >
              {isLoading ? 'Loading…' : 'Seaech'}
            </Button>
          </div>


        </div>


      </div>

      <div className="BoxlistItems">
        {rice.map((val, idx) => (
          <div key={idx} className="info">
            <h5 className='h5'>{val.food.label}</h5>
            <h5 className='h5'>{val.food.nutrients.ENERC_KCAL} Cal</h5>
            <img
              src={val.food.image}
              style={{
                width: '70%',
                borderRadius: 10
              }}
              alt={val.food.label}
            />
          </div>
        ))}


      </div>
    </div>
  );
}

export default App;
