import { supabase } from "@/lib/supabaseClient"
import styles from '@/styles/Tree.module.css' 
import { useState } from 'react';


export default function Tree( { parent_assemblies } ) {

    const [subassembly, setSubassembly] = useState('null');

    function handleClick(e) {
              e.preventDefault();
              const curr = e.target.getAttribute('assid');
              setSubassembly(curr)
              return curr
            }

    return (
      <main className={styles.main}>
        <div>
          <p>You are in test directory</p>
          {/* <p>{menu.map(x => <div key={x.id}>{x.id}</div>)}</p> */}
          <p>hello </p>
          <p>I now test the tree module </p>
          <div className='tree-container'>
          <div className="tree">
           {/* <pre>{JSON.stringify(menus, null, 2)}</pre> */}
           {parent_assemblies.map(parent => <div key={parent.id} className='parent-container'>
                                                                 
                                  <h4>{parent.name}</h4>
                                  <ul className='sub-container'>{parent.assembly.map(child_assembly => <li key={child_assembly.id} assid = {child_assembly.assid} onClick={handleClick} className='subassembly'>{child_assembly.name}</li>)}</ul>
                              </div>
            )
            }
            </div>
            <div className='imgnsn'>listnsn show subassembly: {subassembly}</div>
            </div>
        </div>
      </main>
    )
  }

export async function getStaticPaths(){
    
    // inner join ώστε να κουμπώσει κάθε κύριο με την κατηγορία του και τους καταλόγους του
    const {data: catalogues, error} = await supabase.from('catalogue').select('slug,kyrio:kyrio_id (slug,category:category_id (slug) )')
    
    const paths = catalogues.map(x => ({params: {category: x.kyrio.category.slug, kyrio: x.kyrio.slug, catalogue: x.slug}}))
    return {paths, fallback: false}
}

export async function getStaticProps( { params } )  {
  
    // Θέλω τον κατάλογο για να βρω συγκροτήματα, υπο-συγκροτήματα και ΑΟ
    const {data: catalogue, error1} = await supabase.from('catalogue').select('id,name,slug').eq('slug',params.catalogue)  
    // Από τον κατάλογο, βρες τα συγκροτήματα με εμφωλευμένα τα υπο-συγκροτήματα, ώστε να έχουν δενδρική μορφή
    const {data: parent_assemblies, error2} = await supabase.from('assembly').select('id,name,caption,assembly (id,assid,name,caption)').eq('catalogue_id',catalogue[0].id).is('parent_id',null)
    // Από τον κατάλογο, βρες μόνο τα υπο-συγκροτήματα για βρούμε τους ΑΟ
    const {data: sub_assemblies, error3} = await supabase.from('assembly').select('id').eq('catalogue_id',catalogue[0].id).gt('parent_id',0)
    // Από τα υπο-συγκροτήματα βρες τους ΑΟ
    const {data: test, error4} = await supabase.from('part').select('id').in('assembly_id',sub_assemblies.map(x => x.id))
    console.log(test)
    return {
      props: {
        parent_assemblies,
      }
    }    
  } 
