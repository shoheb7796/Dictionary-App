import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Switch, withStyles } from '@material-ui/core';
import Header from './Components/Header/Header';
import Definitions from './Components/Definitions/Definitions';
import { grey } from '@material-ui/core/colors';

function App() {

  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);

  return (
    <div className="App" 
        style={{ 
            height: '100vh', 
            backgroundColor: lightMode ? "#fff" : "#282c34", 
            color: lightMode ? "black" : "white",
            transition :"all 0.5s linear",
          }}>
      
      <Container 
        maxWidth="md" style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent:"space-evenly" }}>

        <div style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}>
          <span>{lightMode ? "Dark" : "Light" } Mode</span>
          <DarkMode checked={lightMode} onChange={() => setLightMode(!lightMode)} />
        </div>

        <Header 
            category={category} 
            setCategory={setCategory} 
            word={word} 
            setWord={setWord} 
            lightMode={lightMode}
            />
        {meanings && (
          <Definitions word={word} meanings={meanings} category={category} lightMode={lightMode}/>)
        }
      </Container>
    </div>
  );
}

export default App;
