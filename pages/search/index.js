import { useState } from 'react';
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient';


export default function Home( { allParts } ) {

    const [search, setSearch] = useState('')

    const handleChange = (event) => {
    event.preventDefault();
    const curr = event.target.value;
    setSearch(curr);
  }

    return (
    <main className='main'>
      
         <div className='search-wrapper'>
         <form>
          <input type='text' onChange={handleChange} name='ao'/>
        </form>
          </div>
          <div>
          {search.length>3?
                <table>
                <thead>
                    <tr>
                        <th>Α/Ο</th>
                        <th>P/N</th>
                        <th>ΠΕΡΙΓΡΑΦΗ</th>
                        <th>ΚΥΡΙΟ ΥΛΙΚΟ</th>
                        <th>ΚΑΤΑΛΟΓΟΣ</th>
                        <th>ΥΠΟΣΥΓΚΡΟΤΗΜΑ</th>
                    </tr>
                </thead>
                <tbody>
                {allParts.filter(y => y.nsn && y.pn?y.nsn.includes(search) || y.pn.includes(search):y.nsn?y.nsn.includes(search):y.pn?y.pn.includes(search):0).map(x => <tr key={x.id}>
                  <td>{x.nsn}</td>
                  <td>{x.pn}</td>                
                  <td>{x.name}</td>
                  <td>{x.assembly.catalogue.kyrio.name}</td>
                  <td>{x.assembly.catalogue.name}</td>
                  <td><Link href={`${x.assembly.catalogue.kyrio.category.slug}/${x.assembly.catalogue.kyrio.slug}/${x.assembly.catalogue.slug}//${x.assembly.parent_assid}//${x.assembly.assid}`}>{x.picture_no} &#8618;</Link></td>
                  </tr>)}
                </tbody>
                </table>
:''}
        </div>
    </main>
  )
}

export async function getStaticProps()  {
  
  const { data: allParts, error } = await supabase.from('part').select('id,ref_no,picture_no,name,nsn,pn,assembly (id,assid,parent_assid, catalogue(id,name,slug, kyrio(id,name,slug,category(id,slug))))');
  
  return {
    props: {
        allParts,
    }
  }    
}


