import { useEffect, useState } from "react"
import axios from 'axios'
import { AllEventsURL, AllSocietiesURL } from "../endPointUrls"
import SideNavbar from "./SideNavbar"


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
        <div className="container">
            <SideNavbar />
            <div className="societies">
                <h1>Societies</h1>
                {
                    societies.map((item) => {
                        return (
                            <div className="societyCard">
                                <h2>{item.name}</h2>
                                <h3>{item.discrption}</h3>
                                <p>number of members:{item.members}</p>
                                <button>join</button>
                            </div>
                        )
                    })

                }
                <div>
                    <h1>Events</h1>
                    {
                        events.map((item) => {
                            return (
                                <div className="eventCard">
                                    <h2>{item.name}</h2>
                                    <h3>{item.discrption}</h3>
                                    <h3>last date to register:{item.lastDate}</h3>
                                    <h3>event date:{item.date}</h3>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Dashboard