import { userAgent } from "next/server"
import { useState } from "react"


export function Listnsn({antka}){

    const [aithsh,setAithsh]=useState([])
    console.log(aithsh)

    function handleChange(e){
        e.preventDefault()
        const currpart = {id:e.target.getAttribute('id'),pos: e.target.value, ao:e.target.getAttribute('partao'), pn:e.target.getAttribute('partpn'),per:e.target.getAttribute('partname')}
        const oldait=aithsh.filter(x=>x.id !== currpart.id)        
        const newait = [...oldait,currpart]
        setAithsh(newait)
    }


    return (
    <div className="nsn">
        <p>τραβα τα ανταλλακτικά:</p>
        <form className="form-listnsn">
            <table>
                <thead>
                    <tr>
                        <th>Α/Α</th>
                        <th>Α/Ο</th>
                        <th>P/N</th>
                        <th>ΠΕΡΙΓΡΑΦΗ</th>
                        <th>ΠΛΗΘΟΣ</th>
                        <th>ΑΙΤΟΥΜΕΝΗ ΠΟΣΟΤΗΤΑ</th>
                    </tr>  
                </thead>
                <tbody>
                    {antka.map( part => 
                    <tr key={part.id}>
                        <td>{part.ref_no}</td>
                        <td>{part.nsn?part.nsn:'Άνευ ΑΟ'}</td>
                        <td>{part.pn?part.pn:'-'}</td>
                        <td>{part.name}</td><td>{part.quantity}</td>
                        <td><input id={part.id} onChange={handleChange} partname={part.name} partpn={part.pn} partao={part.nsn} type='number' defaultValue={`${aithsh.some(x=>x.id==part.id)?aithsh.find(x=>x.id==part.id).pos:0}`} min={0} max={part.quantity}/></td>
                    </tr>)}
                </tbody>
            </table>
        </form>
    </div>)
}