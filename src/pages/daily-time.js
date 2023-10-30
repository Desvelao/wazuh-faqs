import * as React from "react"
import { Layout } from "../components";
import { getParametersFromURL } from "../utils";

function getWeek(){
    // https://weeknumber.com/how-to/javascript#:~:text=To%20get%20the%20ISO%20week,getWeekYear()%20.
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
}

function calcUsername(usernames){
    const dayOfWeek = new Date().getDay();
    if(dayOfWeek > 5){
        return null;
    }
    return usernames[
        ((getWeek() - 1) * 5 + dayOfWeek) % usernames.length
    ]
}

function _calcUsername(usernames, dayOfWeek, week){
    return usernames[
        (week * 5 + dayOfWeek) % usernames.length
    ]
}


function _t(usernames, dayOfWeek, week, username){
    const usernameResult = _calcUsername(usernames, dayOfWeek, week);
    console.log(`dayOfWeek: ${dayOfWeek}, week: ${week}, username: ${username}, result: ${usernameResult} - ${username === usernameResult}`)
}



export default ({location}) => {
    const [status, setStatus] = React.useState({loading: true, username: null, error: null})

    React.useEffect(() => {
        const [usernamesParams] = getParametersFromURL(location, ['usernames']);
        if(usernamesParams){
            const usernames = usernamesParams.split(',')
            const username = calcUsername(usernames)
            setStatus({loading: false, username: calcUsername(usernames), error: username === null ? 'No daily today... 😔' : null})
        }else{
            setStatus({loading: false, username: null, error: 'No usernames URL parameter provided... 😔'})
        }
    }, [])

    return (
        <Layout>
            <div style={{
                margin: '0 auto',
                height: '100%',
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {status.loading ? (
                    <div>Loading...</div>
                ) : (
                    <div style={{
                        fontSize: 150
                    }}>{status.username || status.error}</div>
                )}
            </div>
        </Layout>
    )
}