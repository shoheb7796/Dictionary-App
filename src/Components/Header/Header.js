import { createMuiTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './Header.css';
import categories from '../../data/category';

const Header = ({setCategory, category, word, setWord, lightMode}) => {

    const darkTheme = createMuiTheme({
        palette: {
            primary: {
                main: lightMode ? "#000" : "#fff",
            },
            type: lightMode? "light" : "dark",
        },
    });

    const handleChange = (language) =>{
        setCategory(language);
        setWord("");
    }

    return (
        <div className="header">
            <span className="title">{word ? word :"Word Hunt"}</span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField 
                        className="search" 
                        label="Search a word" 
                        // label="Standard"
                        value={word}
                        onChange={(e)=>setWord(e.target.value)} 
                    />
                    <TextField
                       className="select"
                        select
                        label="Language"
                        value={category}
                        onChange={(e)=>handleChange(e.target.value)}
                    >
                        {
                            categories.map((option)=>
                            <MenuItem key={option.label} value={option.label}>{option.value}</MenuItem>)
                        }
                        
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
