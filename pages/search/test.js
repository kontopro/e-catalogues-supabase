import { useState } from 'react';
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient';
import Subnav from '@/components/Subnav';


export default function Home( { parts } ) {

    const [search, setSearch] = useState('')

    
    return (
    <main className='main'>
         <div className='search-wrapper'>
          <p>Hello 
            {parts.length}
            </p>
        </div>
    </main>
  )
}

export async function getStaticProps()  {
  
    const {data: sub_assemblies, error3} = await supabase.from('assembly').select('id').eq('catalogue_id',69).gt('parent_id',0)
    // const arr_ass = sub_assemblies.map(x => x.id);
    const arr_ass = [33992,33993,33994,33995,33996,33997,33998,33999,34000,34001,34002,34003,34004,34005,34006,34007,34008,34009,34010,34011,34012,34013,34014,34015,34016,34017,34018,34019];
    
    // const { data: allParts, error } = await supabase.from('part').select('id,ref_no,picture_no,name,nsn,pn,assembly(id,assid,parent_assid, catalogue(id,name,slug, kyrio(id,name,slug,category(id,slug))))');
    // const {data: parts, error4} = await supabase.from('part').select('id,assembly_id').in('assembly_id',arr_ass)
    const {data: parts, error4} = await supabase.rpc('get_parts', {cat_id: 69}).select('id,ref_no,picture_no,name,nsn,pn,assembly(id,assid,parent_assid, catalogue(id,name,slug, kyrio(id,name,slug,category(id,slug))))')
    // console.log(parts);
  
  return {
    props: {
        parts,
    }
  }    
}


