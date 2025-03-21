import { useEffect, useState } from "react"
import axios from 'axios'
import { AllEventsURL, AllSocietiesURL } from "../endPointUrls"



function Dashboard() {
    const [societies, setSocieties] = useState([]);
    const [events, SetEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)


    // useEffect(() => {
    //     const fetchSocieties = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await axios.get(AllSocietiesURL)
    //             const response = data.json()
    //             setSocieties(response.societies);
    //         }
    //         catch (e) {
    //             setError('something went wrong')
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     const fetchEvents = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await axios.get(AllEventsURL)
    //             const response = data.json()
    //             setSocieties(response.events);
    //         }
    //         catch (e) {
    //             setError('something went wrong')
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    // }, [])


    return (
        <div></div>
    );
}

export default Dashboard