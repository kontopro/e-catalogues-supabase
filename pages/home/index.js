import Image from 'next/image'
import Link from 'next/link'
// import { Roboto } from 'next/font/google'
import styles from '@/styles/Test.module.css'
import { supabase } from '@/lib/supabaseClient';

// const roboto = Roboto({ subsets: ['latin', 'greek'] })

export default function Test( { menus } ) {
  return (
    <main className={styles.main}>
      <div>
        <p>You are in home directory</p>
        <p>hello </p>
         <div className='cards-wrapper'>
         {menus.map(menu => <div key={menu.id} className="card">
                                <div className='card-image'>
                                  <p><Image src={`/images/category/${menu.slug}.jpg`} width='400' height='200'/></p>
                                </div>
                                <div className='card-title'>                             
                                  <p><Link href={`/${menu.slug}`}>Τίτλος: {menu.name}</Link></p>
                                </div>
                                <div className='card-desc'>
                                  <p>description</p>
                                </div>
                            </div>
          )
          }
          </div>
      </div>
    </main>
  )
}

export async function getStaticProps()  {
  
  const { data: menu, error } = await supabase.from('category').select().is('parent_id',null);
  
  if (!menu) {
    return {props: {menus:'not categories'}}
  }
  return {
    props: {
      menus: menu,
    }
  }    
}


