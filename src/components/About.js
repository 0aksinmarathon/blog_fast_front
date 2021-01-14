import {useEffect, useState} from 'react';
import axios from 'axios';


function About() {
    const [fox, setFox] = useState()
    useEffect(async () => {
        const tmp = axios.defaults.headers.common['Authorization']
        axios.defaults.headers.common['Authorization'] = ''
        const res = await axios.get(`https://randomfox.ca/floof/`,
        {
            headers: {
                'Content-Type': 'application/json',
            }})    
        console.debug(res)
        console.debug('About')
        axios.defaults.headers.common['Authorization'] = tmp
    }, [])
    
    return (
        <h1>About</h1>
    );
}

export default About;

