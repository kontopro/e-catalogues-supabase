import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"
import styles from '@/styles/Catalogue.module.css' 

export default function Catalogue( { category, kyrio, catalogue, main_assemblies } ) {
    
    return  <main className={styles.main}>
                <div>You are in catalogue <b>{catalogue.name}!</b></div>
                {/* Λίστα με κύρια συγκροτήματα και σύνδεσμοι προς αυτά */}
                <div>{main_assemblies.map(x => <div key={x.id}><Link href={`/${category}/${kyrio}/${catalogue.slug}/${x.assid}`}>{x.name}</Link></div>)}</div>
            </main>
} 

export async function getStaticPaths(){

    // Εφόσον στο υπόψη url φαίνονται κατηγορία, κύριο και κατάλογος θέλω τα slug τους ως παραμέτρους του paths

    // inner join ώστε να κουμπώσει κάθε κύριο με την κατηγορία του και τους καταλόγους του
    const {data: catalogues, error} = await supabase.from('catalogue').select('slug,kyrio:kyrio_id (slug,category:category_id (slug) )')    

    // Δημιουργία παραμέτρων
    const paths = catalogues.map((x) => ({
        params: {catalogue: x.slug, kyrio: x.kyrio?x.kyrio.slug:'', category: x.kyrio?x.kyrio.category?x.kyrio.category.slug:'':''}
    }))
    
    return {paths, fallback: false}
}

export async function getStaticProps( { params } ){

    // Για τις πληροφορίες του Καταλόγου επιστρέφω ολόκληρο τον κατάλογο
    // Για το link προς κάθε κύριο συγκρότημα απαιτείται να επιστρέψω τα slug της κατηγορίας, του κυρίου υλικού, καθώς και όνομα - slug(assid) για κάθε κύριο συγκρότημα

    // Τσίμπα το slug του Κυρίου Υλικού 
    const kyrio = params.kyrio

    // Τσίμπα το slug της Κατηγορίας 
    const category = params.category

    // Τσίμπα όλο τον Κατάλογο από το slug (χρειάζομαι id για ανεύρεση κύριων συγκροτημάτων, όνομα για εμφάνιση και slug για το link)
    const {data: catalogues, error: err1} = await supabase.from('catalogue').select().eq('slug',params.catalogue)
    const catalogue = catalogues[0]
    console.log(catalogue)
    
    // Έλεγχος για κύρια συγκροτήματα του Καταλόγου
    const {data: main_assemblies, error: err2} = await supabase.from('assembly').select().eq('catalogue_id',catalogue.id).is('parent_id', null)    
    
    return {
        props: {category, kyrio, catalogue, main_assemblies}
    }
}