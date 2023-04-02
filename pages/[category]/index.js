import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"
import styles from '@/styles/Category.module.css' 

export default function Category( { category, subcategories, kyria } ) {
    
    return  <main className={styles.main}>
                <div>You are in category <b>{category.name}!</b></div>
                <div>{}</div>
            </main>
} 

export async function getStaticPaths(){

    const {data: menus, error} = await supabase.from('category').select().is('parent_id',null)
    const paths = menus.map((x) => ({
        params: {category: x.slug}
    }))
    return {paths, fallback: false}
}

export async function getStaticProps( { params } ){

    // Τσίμπα την κατηγορία από το slug
    const {data: menu, error: err1} = await supabase.from('category').select().eq('slug',params.category)
    const category = menu[0]
    // Έλεγχος για sub-categories
    const {data: submenu, error: err2} = await supabase.from('category').select().eq('parent_id',category.id)
    const subcategories = submenu
    console.log(subcategories)
    // Έλεγχος για κύρια υλικά της κατηγορίας
    const {data: kyria, error: err3} = await supabase.from('kyrio').select().eq('category_id',category.id)
    console.log(kyria)
    return {
        props: {category, subcategories, kyria}
    }
}