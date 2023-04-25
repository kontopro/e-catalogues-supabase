import { supabase } from "@/lib/supabaseClient"
import Assembly from "../[assembly]"


export default function Tree(){
    return  <>
                <div>
                <p>hello <b>Tree navigation</b> like old catalogues</p>
                <p>For each catalogue: I want <b>all</b> assemblies under their parent assemblies</p>
                <p>+ menu for modern (card) navigation</p>
                </div>
                {/* Χωρισμός στα δύο τμήματα: tree και image με ΑΟ */}
                <div className="tree-container">
                        <div className="tree">
                            <p>Εδώ η δενδρική μορφή</p>
                            <div className="treeass"></div>
                        </div>
                        <div className="imgnsn">Εδώ η εικόνα του υποσυγκορτήματος κι από κάτω οι ΑΟ που περιέχονται σε αυτή!</div>
                </div>   
            </>
}
   export async function getStaticProps (){

        const {data, error} = await supabase.from('catalogue').select('id,name,slug').eq('slug','cat-chassis-leo1a5')
        const catalogue = data;
        console.log(catalogue)
        return null

   }     
