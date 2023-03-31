import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Test.module.css'
import { supabase } from './../lib/supabaseClient';

const inter = Inter({ subsets: ['latin'] })

export default function Test() {
  return (
    <main className={styles.main}>
      <div>
        <p>You are in `page` directory</p>
      </div>
    </main>
  )
}
