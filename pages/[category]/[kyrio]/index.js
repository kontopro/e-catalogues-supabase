import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"
import styles from '@/styles/Category.module.css' 

export default function Kyrio( { category, kyrio, ecats } ) {
    
    return  <main className={styles.main}>
                <div>You are in kyrio <b>{kyrio.name}!</b></div>
                <div>{ecats.map(x => <div key={x.id}><Link href={`/${category}/${kyrio.slug}/${x.slug}`}>{x.name}</Link></div>)}</div>
            </main>
} 

export async function getStaticPaths(){

    // Εφόσον στο υπόψη url φαίνονται κατηγορία και κύριο θέλω τα slug τους ως παραμέτρους του paths

    // inner join ώστε να κουμπώσει κάθε κύριο με την κατηγορία του
    const {data: kyria, error} = await supabase.from('kyrio').select('slug,category:category_id (slug)')

    // Δημιουργία παραμέτρων
    const paths = kyria.map((x) => ({
        params: {kyrio: x.slug, category: x.category.slug}
    }))

    return {paths, fallback: false}
}

export async function getStaticProps( { params } ){

    // Για τις πληροφορίες του Κυρίου Υλικού επιστρέφω όλο το kyrio
    // Για το link προς κάθε κατάλογο απαιτείται να επιστρέψω τα slug της κατηγορίας και όνομα - slug για κάθε κατάλογο

    // Τσίμπα το slug της Κατηγορίας 
    const category = params.category

    // Τσίμπα όλο το Κύριο Υλικό από το slug (χρειάζομαι id για ανεύρεση καταλόγων, όνομα για εμφάνιση και slug για το link)
    const {data: kyria, error: err2} = await supabase.from('kyrio').select().eq('slug',params.kyrio)
    const kyrio = kyria[0]
    
    // Έλεγχος για διαθέσιμους ηλεκτρονικούς καταλόγους του Κυρίου Υλικού
    const {data: ecats, error: err3} = await supabase.from('catalogue').select().eq('kyrio_id',kyrio.id)    
    
    return {
        props: {category, kyrio, ecats}
    }
}