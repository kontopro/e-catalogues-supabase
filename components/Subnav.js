import Backbutton from "@/components/Backbutton";
import Aithshbutton from "@/components/Aithshbutton";
import Printbutton from "@/components/Printbutton";
import { usePathname }  from "next/navigation"

export default function Subnav({txt,aithshbtn,printbtn}){

    const pathName = usePathname();
    const slashCount = (pathName.match(/\//g) || []).length;
    console.log(slashCount);
    return(
        <div className="sub-nav no-print" >
                  <Backbutton />
                  <div className='center-sub-nav'>{txt}</div>
                  <div className='right-sub-nav'>
                  {aithshbtn?<Aithshbutton />:null}
                  {printbtn?<Printbutton />:null}
                  </div>

                  
        </div>
    )
}