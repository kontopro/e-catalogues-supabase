import { supabase } from "@/lib/supabaseClient"
import styles from '@/styles/Tree.module.css' 


export default function Tree( { parent_assemblies } ) {
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
                                  <div className='sub-container'>{parent.assembly.map(child_assembly => <div key={child_assembly.id} className='subassembly'>{child_assembly.name}</div>)}</div>
                              </div>
            )
            }
            </div>
            <div className='imgnsn'>listnsn</div>
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
  
  
    const {data: catalogue, error1} = await supabase.from('catalogue').select('id,name,slug').eq('slug',params.catalogue)  
    const {data: parent_assemblies, error2} = await supabase.from('assembly').select('id,name,caption,assembly (id,name,caption)').eq('catalogue_id',catalogue[0].id).is('parent_id',null)
        
    return {
      props: {
        parent_assemblies,
      }
    }    
  } 
