import Image from 'next/image'
import Gear1 from '@/components/gear1.svg'
import { Listnsn } from "@/components/Listnsn";
import { supabase } from "@/lib/supabaseClient"
import { useState } from 'react';


export default function Tree( { parent_assemblies, catalogue, parts } ) {

    const [subassembly, setSubassembly] = useState('null');

    function handleClick(e) {
              e.preventDefault();
              const curr = e.target.getAttribute('assid');              
              setSubassembly(curr);
              const curli = document.querySelectorAll("li");
              curli.forEach((x) => {
                x.classList.remove("checked");
              });
              e.target.classList.add("checked");
              return curr
            }

    function toggleVisibility(e) {
      e.preventDefault();   
      const parClicked= e.target.closest(".parent-container").classList.toggle("clicked");
      const subOpened= e.target.nextElementSibling.classList.toggle("opened");
      
      // console.log(e.target)
      // console.log('the '+e.target.closest(".parent-container")+' was clicked '+parClicked)
      // console.log('the '+e.target.nextElementSibling.classList+' was opened '+subOpened)

      return parClicked,subOpened;
    }

    const myparts = parts.filter(x => x.assembly.assid == subassembly)

    return (
      <main className="main">
        <div>
          {/* <p>You are in Tree directory</p> */}
          {/* <p>I now test the tree module</p> */}
          <div className='tree-container'>
            <div className="tree">
              <h3>Λίστα Συγκροτημάτων</h3>
              {parent_assemblies.map(parent => 
                <div key={parent.id} id={parent.id} className='parent-container'>
                    
                    <p onClick={toggleVisibility}>&nbsp;&nbsp;&#8680;&nbsp;&nbsp;{parent.name}</p>
                    <ul className='sub-container'>
                        {parent.assembly.map(child_assembly => 
                          <li key={child_assembly.id} assid = {child_assembly.assid} onClick={handleClick} className='subassembly'>{child_assembly.name}</li>
                        )}
                    </ul>
                </div>
              )}
            </div>
            <div className='imgnsn'>
              {subassembly=='null'?<>
              <div className="no-sub"><h4>Εμφάνιση Στοιχείων Υποσυγκροτήματος</h4><p>Επιλέξτε Συγκρότημα και Υποσυγκρότημα από τη Λίστα Συγκροτημάτων, για να εμφανιστεί η αντίστοιχη εικόνα</p></div>
              </>:
              <>
              <div className="title"><h3>Προβολή εικόνας και ανταλλακτικών<br/> του Υποσυγκροτήματος: {subassembly}</h3></div>
              <div className="pic"><p> <Image width={780} height={500} src={`/images/catalogue/${catalogue[0].slug}/${subassembly}.jpg`} /></p></div>
              <Listnsn antka = {myparts} />
              </>}
            </div>
            
        </div>
        </div>
      </main>
    )
  }

export async function getStaticPaths(){
    
    // inner join ώστε να κουμπώσει κάθε κύριο με την κατηγορία του και τους καταλόγους του για το paths
    const {data: catalogues, error} = await supabase.from('catalogue').select('slug,kyrio:kyrio_id (slug,category:category_id (slug) )')
    
    const paths = catalogues.map(x => ({params: {category: x.kyrio.category.slug, kyrio: x.kyrio.slug, catalogue: x.slug}}))
    return {paths, fallback: false}
}

export async function getStaticProps( { params } )  {
  
    // Θέλω τον κατάλογο για να βρω συγκροτήματα, υπο-συγκροτήματα και ΑΟ
    const {data: catalogue, error1} = await supabase.from('catalogue').select('id,name,slug').eq('slug',params.catalogue)
  
    // Από τον κατάλογο, βρες τα συγκροτήματα με εμφωλευμένα τα υπο-συγκροτήματα, ώστε να έχουν δενδρική μορφή
    const {data: parent_assemblies, error2} = await supabase.from('assembly').select('id,name,caption,assembly (id,assid,name,caption)').eq('catalogue_id',catalogue[0].id).is('parent_id',null)
    
    // Από τον κατάλογο, βρες μόνο τα υπο-συγκροτήματα για να βρούμε τους ΑΟ
    const {data: sub_assemblies, error3} = await supabase.from('assembly').select('id').eq('catalogue_id',catalogue[0].id).gt('parent_id',0)
    
    // Από τα υπο-συγκροτήματα βρες τους ΑΟ
    const {data: parts, error4} = await supabase.from('part').select('id,name,nsn,pn,quantity,aid,ref_no,picture_no,assembly (id,assid)').in('assembly_id',sub_assemblies.map(x => x.id)).order('aid')
    
    return {
      props: {
        parent_assemblies,
        catalogue,
        parts

      }
    }    
  } 
