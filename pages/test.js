import Image from 'next/image'
import Link from 'next/link'
// import { Roboto } from 'next/font/google'
import styles from '../styles/Test.module.css'
import { supabase } from '@/lib/supabaseClient';

// const roboto = Roboto({ subsets: ['latin', 'greek'] })

export default function Test( { menus } ) {
  return (
    <main className={styles.main}>
      <div>
        <p>You are in `pages` directory</p>
        {/* <p>{menu.map(x => <div key={x.id}>{x.id}</div>)}</p> */}
        <p>hello </p>
         {/* <pre>{JSON.stringify(menus, null, 2)}</pre> */}
         {menus.map(menu => <div key={menu.id} className={styles.card}>
                                <Image src={`/images/category/${menu.slug}.jpg`} width='400' height='200'/>                               
                                <p><Link href={`/${menu.slug}`}>{menu.name}</Link></p>
                            </div>
          )
          }
      </div>
    </main>
  )
}

export async function getStaticProps()  {
  
  const { data: menu, error } = await supabase.from('category').select().is('parent_id',null);
  
  // console.log(menu)
  // console.log(error)
  if (!menu) {
    return {props: {menus:'not categories'}}
  }
  return {
    props: {
      menus: menu,
    }
  }    
}


