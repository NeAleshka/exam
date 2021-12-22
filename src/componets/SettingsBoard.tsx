import React, {ChangeEvent} from 'react'
import s from './Board.module.css'

type propsSettingsBoardType = {
    minValue:number
    maxValue:number
    setChange:()=>void
    changeMin:(e: ChangeEvent<HTMLInputElement>)=>void
    changeMax:(e: ChangeEvent<HTMLInputElement>)=>void
}

const SettingsBoard = ({minValue,maxValue,setChange,changeMin,changeMax, ...props}: propsSettingsBoardType) => {
    return (
        <div className={s.settingsBoard}>
            <label>Start Value </label>
                <input type={'number'} value={minValue} onChange={changeMin}
                style={{textAlign:'center'}}/>
            <label>Max Value </label>
                <input style={{textAlign:'center'}} type={'number'} value={maxValue} onChange={changeMax}
                       disabled={!Boolean(minValue) && maxValue <= minValue}/>


        </div>
    )
}

export default SettingsBoard