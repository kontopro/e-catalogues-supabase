


export function Listnsn({antka}){

    return (
    <div className="nsn">
        <p>τραβα τα ανταλλακτικά:</p>
        {antka.map( x => <p key={x.aid}> {x.aid},{x.ref_no},{x.picture_no},{x.nsn?x.nsn:'Άνευ ΑΟ'},{x.pn},{x.quantity},{x.assembly.assid} </p>
        )}
    </div>)
}