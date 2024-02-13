import * as React from "react"
import { Button, Callout, Layout } from "../components";
import { getParametersFromURL } from "../utils";
import { ButtonFlyout } from "../components/button/button-flyout";

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


function _calcUsernameByDate(usernames, dayOfWeek, week){
    return usernames[
        (week * 5 + dayOfWeek) % usernames.length
    ]
}

const selectUsername = {
    date: function date(list){
        const dayOfWeek = new Date().getDay();
        if(dayOfWeek > 5){
            return null;
        }
        return list[
            ((getWeek() - 1) * 5 + dayOfWeek) % list.length
        ]
    },
    random: function random (list){
        return list[Math.floor(Math.random() * list.length)]
    }
}


function _t(usernames, dayOfWeek, week, username){
    const usernameResult = _calcUsernameByDate(usernames, dayOfWeek, week);
    console.log(`dayOfWeek: ${dayOfWeek}, week: ${week}, username: ${username}, result: ${usernameResult} - ${username === usernameResult}`)
}


const pageTips = [
    {
        type: "info",
        message: <>
            <strong>Info:</strong> <code>usernames</code> URL parameter is required to define the comma-separated usernames. Example: usernames=A,B,C,D
        </>
    },
    {
        type: "info",
        message: <>
            <strong>Info:</strong> <code>mode</code> URL parameter can be used to set the preselected mode. Allowed values: {Object.keys(selectUsername).sort().join(', ')}.
            Example: mode=date
        </>
    },
]

const initialState = {loading: true, username: null, error: null, method: null}

export default ({location}) => {
    const [status, setStatus] = React.useState({...initialState})

    function getUsername(method, setter){
        const [usernamesParams] = getParametersFromURL(location, ['usernames']);
        setter({...initialState, loading: true})
        if(usernamesParams){
            const usernames = usernamesParams.split(',').sort()
            const username = method(usernames)
            setter({loading: false, username: username, error: username === null ? 'No daily today... 😔' : null, method: method.name})
        }else{
            setter({loading: false, username: null, error: 'No usernames URL parameter provided... 😔', method: method.name})
        }
    }

    React.useEffect(() => {
        const [selectedMode] = getParametersFromURL(location, ['mode']);
        const selectedModeFormatted = (selectedMode || 'date').toLowerCase()
        if(selectUsername[selectedModeFormatted]){
            getUsername(selectUsername[selectedModeFormatted], setStatus)
        }else{
            setStatus({loading: false, username: null, error: 'No supported mode... 😔', method: null})
        }
    }, [])

    return (
        <Layout buttons={
            <div>
                <ButtonFlyout label='Tips'>
                    <div className="mb-s">
                        <div className="mb-s">Tips</div>
                        {pageTips.map(({type, message}) => (
                            <Callout type={type} className="mb-s">
                                {message}
                            </Callout>
                        ))}
                    </div>
                </ButtonFlyout>
            </div>
          }>
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
                    <div>
                        <div style={{
                            fontSize: 150
                        }}>{status.username || status.error}</div>
                        <div style={{margin: '0 auto'}}>mode: {status.method}</div>
                    </div>
                    
                )}
            </div>
            <div className="mb-s">
                <div>
                    <div>Modes:</div>
                    <div>
                        {[
                            {label: '📅 Date', method: selectUsername.date, title: 'Ignoding the holidays, select one according to the monday-friday days of the year'},
                            {label: '🎲 Random', method: selectUsername.random, title: 'Randomize'}
                        ].map(({label, method, ...rest}) => <Button onClick={() => getUsername(method, setStatus)} {...rest}>{label}</Button>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}