import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import Board from "./componets/Board";
import Button from "./componets/Button";
import SettingsBoard from "./componets/SettingsBoard";


function App() {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const start = min
    const [error, setError] = useState('')
    useEffect(()=>{
        let minValueAsString=localStorage.getItem("minValue")
        let maxValueAsString=localStorage.getItem("maxValue")
        let countBoardAsString=localStorage.getItem("countBoard")
        if(minValueAsString && maxValueAsString&&countBoardAsString){
            setMin(JSON.parse(minValueAsString))
            setMax(JSON.parse(maxValueAsString))
            setCount(JSON.parse(countBoardAsString))
        }
    },[])
    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(max))
        localStorage.setItem('minValue', JSON.stringify(min))
        localStorage.setItem('countBoard', JSON.stringify(count))
    })
    const [count, setCount] = useState<number>(start)

    const increment = () => {
        if(count<max)
        setCount(count + 1)
    }
    const reset = () => {

        setCount(min)
    }

    const changeMin = (e: ChangeEvent<HTMLInputElement>) => {

        if(+e.currentTarget.value>=0 && +e.currentTarget.value<max ){
            setMin(+e.currentTarget.value)
            setError('')
            setCount(+e.currentTarget.value)
        }
        else {
            setMin(+e.currentTarget.value)
            setError('error')
        }
    }
    const changeMax = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(+e.currentTarget.value)
        if (+e.currentTarget.value <= min) {
            setError('error')
            setMax(+e.currentTarget.value)
        } else {
            setError('')
        }
    }
    const setChange = () => {
        if (max <= min) {
            setError('error')
        } else {
            setCount(min)
            setMax(max)
            setError('')
        }
    }
// const disableLeft
    return (
        <div style={{display: 'flex'}}>
            <div className="Left">
                <Board count={count} maxValue={max} minValue={min} error={error}/>
                <div className='butt'>
                    <Button name='inc' callback={increment} backColor='#68499b' disable={Boolean(error)|| count===max}/>
                    <Button name='reset' callback={reset} backColor='#8697d3' disable={Boolean(error)|| count===min}/>
                </div>
            </div>
            <div className='Right'>
<SettingsBoard minValue={min} maxValue={max} setChange={setChange} changeMin={changeMin
} changeMax={changeMax}/>
                <div className={'butt'} onClick={setChange}><Button name={"set"} backColor={'green'}
                                                                    disable={min<0 || min >= max}/></div>

            </div>
        </div>

    );
}

export default App