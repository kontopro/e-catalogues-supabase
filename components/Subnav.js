import Backbutton from "@/components/Backbutton";
import Aithshbutton from "./Aithshbutton";
import { usePathname }  from "next/navigation"

export default function Subnav(){

    const pathName = usePathname();
    const slashCount = (pathName.match(/\//g) || []).length;
    console.log(slashCount);
    return(
        <div className="sub-nav" >
                  <Backbutton />
                  <div className='center-sub-nav'> </div>
                  {slashCount>1?<Aithshbutton />:null}
                  
        </div>
    )
}