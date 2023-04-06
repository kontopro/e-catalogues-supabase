import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"
import styles from '@/styles/Catalogue.module.css' 

export default function Subassembly( { /* category, kyrio,  sub_assemblies, catalogue */  assembly, parts } ) {
    
    const no_parent_assembly = parts.length?1:0
    return  <main className={styles.main}>
                <div>You are in assembly <b>{assembly.assid}!</b></div>
                <div>It is {no_parent_assembly?<b>NOT A</b>:<b>A</b>} <b>parent</b> assembly</div>
                {/* Αν είχα δενδρική, τότε θέλω: category, kyrio,  sub_assemblies, catalogue  */}
                {no_parent_assembly?parts.map(x => <div key={x.id}>{`${x.ref_no}: ${x.nsn}`}</div>):
                {/* Σε περίπτωση δενδρικής συγκροτημάτων: Λίστα με υπο συγκροτήματα και σύνδεσμοι προς αυτά */
                /* <div>{sub_assemblies.map(x => <div key={x.id}><Link href={`/${category}/${kyrio}/${catalogue}/${assembly.assid}/${x.assid}`}>{x.name}</Link></div>)}</div> */ }
                }
            </main>
} 

export async function getStaticPaths(){

    // Εφόσον στο υπόψη url φαίνονται κατηγορία, κύριο, κατάλογος, κύριο συγκρότημα και υπο-συγκρότημα θέλω τα slug τους ως παραμέτρους του paths

    // deep inner join ώστε να κουμπώσει κάθε υπο-συγκρότημα με το κύριο συγκρότημα, τον κατάλογο, το κύριο υλικό και την κατηγορία του
    const {data: assemblies, error} = await supabase.from('assembly').select('parent_assid,assid, catalogues: catalogue_id(slug,kyria: kyrio_id(slug,categories:category_id (slug)))').gt('parent_id',0)    
    
    // Δημιουργία παραμέτρων
    const paths = assemblies.map((x) => ({
        params: {assembly: x.parent_assid,subassembly:x.assid, catalogue: x.catalogues.slug,kyrio: x.catalogues.kyria.slug,category: x.catalogues.kyria.categories.slug}
    }))
    
    return {paths, fallback: false}
}

export async function getStaticProps( { params } ){

    // Για τις πληροφορίες του Υπο-Συγκροτήματος επιστρέφω το υπο-συγκρότημα ως assembly
    
    // Τσίμπα το slug του Καταλόγου, θέλω και το id ώστε να έχω unique assid και catalogue_id
    const catalogue = params.catalogue

    // Επιπλεόν ανεύερση catalogue_id για μοναδικότητα συγκροτήματος (δεν έχω μοναδικό slug όπως συνέβαινε μέχρι τώρα)
    const {data, error: err0} = await supabase.from('catalogue').select('id').eq('slug',catalogue)
    const cat_id = data[0].id
    
    // Τσίμπα το slug του Κυρίου Υλικού 
    // const kyrio = params.kyrio

    // Τσίμπα το slug της Κατηγορίας 
    // const category = params.category

    // Τσίμπα το Υπό-Συγκρότημα (ως assembly) από το assid,catalogue_id (unique) γιατί χρειάζομαι ανεύρεση ανταλλακτικών)
    const {data: assemblies, error: err1} = await supabase.from('assembly').select().eq('assid',params.subassembly).eq('catalogue_id',cat_id)
    const assembly = assemblies[0]    
    
    // Έλεγχος για υπο-συγκροτήματα, σε περίπτωση δενδρικής μορφής
    // const {data: sub_assemblies, error: err2} = await supabase.from('assembly').select().eq('parent_id',assembly.id)  
    
    // Τσίμπα τα ανταλλακτικά
    const {data: parts, error: err3} = await supabase.from('part').select().eq('assembly_id',assembly.id)  
    
    return {
        props: {/* category, kyrio, sub_assemblies, catalogue */ assembly, parts}
    }
}