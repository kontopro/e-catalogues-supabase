import Image from 'next/image'
import Link from 'next/link'
// import { Roboto } from 'next/font/google'
import styles from '../styles/Test.module.css'
import { supabase } from '@/lib/supabaseClient';

// const roboto = Roboto({ subsets: ['latin', 'greek'] })

export default function Test( { parent_assemblies } ) {
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
                                <div className='sub-container'>{parent.assembly.map(child => <div key={child.id} className='subassembly'>{child.name}</div>)}</div>
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

export async function getStaticProps()  {
  
  
  const {data: catalogue, error1} = await supabase.from('catalogue').select('id,name,slug').eq('slug','cat-chassis-leo1a5')  
  const {data: parent_assemblies, error2} = await supabase.from('assembly').select('id,name,caption,assembly (id,name,caption)').eq('catalogue_id',catalogue[0].id).is('parent_id',null)
  console.log(parent_assemblies)
  
  // console.log(menu)
  // console.log(error)
  
  return {
    props: {
      parent_assemblies,
    }
  }    
}


