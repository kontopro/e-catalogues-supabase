import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"
import styles from '@/styles/Category.module.css' 

export default function Category( { category } ) {

    return <main className={styles.main}>
                <div>You are in category <b>{category.name}!</b></div>
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

    const {data: menu, error} = await supabase.from('category').select().eq('slug',params.category)
    const category = menu[0]
    return {
        props: {category}
    }
}