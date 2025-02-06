"use client"
import { useState, useEffect } from 'react'

import { supabaseClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation';
import { DeleteConfirmationModal } from '@/app/components/deleteConfirmationModal';

//import { eliminazione } from '@/action';


interface servizio{ 
  id:number
  titolo:string,
  immagine:string,
  durata:string,
  descrizione:string
}
import { ServiceCard } from '@/app/components/serviceCard';

function ServiziAttivi() {

  const router = useRouter()
  const dbClient = supabaseClient();

  const [servizi,setServizi] = useState<servizio[]>([]);
  const [eliminare,setElimina] = useState(false);
  const [selectServiceId,setSelectendServiceID]=useState<number>(0)
  const [selectServiceTitle,setSelectendServiceTitle]=useState<string>("")
  const [imageUrl,setImageUrl] = useState("")

  const [revalidateData,setRevalidateData]=useState(false);

  useEffect(()=>{
    async function getServizi(){
      const {data} = await dbClient.from("servizi").select();

      if(data){
        const serviziFormattati = data.map((servizio) => ({
          id:servizio.id,
          titolo: servizio.titolo,
          immagine: servizio.immagine,
          durata: servizio.durata,
          descrizione: servizio.descrizione,
        }))

        setServizi(serviziFormattati)
      }
    }

    getServizi()
  },[revalidateData])

  function edit(id:number){
    router.push(`/servizi/servizi-attivi/${id}`)
  }

  function elimina(id:number,title:string, imageUrl:string){
    setElimina(true)
    setSelectendServiceID(id)
    setSelectendServiceTitle(title)
  }

  async function eliminazione(id:number){
    const {data:table} = await dbClient.from("servizi").delete().eq("id",id).select()
    
    const {data} = await dbClient.storage.from("Immagini").remove([selectServiceTitle])

    setRevalidateData(!revalidateData)
  }

  return (
    <>
          {servizi.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {servizi.map(servizio=>(
                <ServiceCard key={servizio.id} id={servizio.id} title={servizio.titolo} imageUrl={servizio.immagine} onDelete={elimina} onEdit={edit} />
              ))}
            </div>
          ) : (
            <svg className='w-[150px] h-[150px] mx-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#000000" stroke="#000000" strokeWidth="15" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate></circle><circle fill="#000000" stroke="#000000" strokeWidth="15" opacity=".8" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate></circle><circle fill="#000000" stroke="#000000" strokeWidth="15" opacity=".6" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate></circle><circle fill="#000000" stroke="#000000" strokeWidth="15" opacity=".4" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate></circle><circle fill="#000000" stroke="#000000" strokeWidth="15" opacity=".2" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate></circle></svg>     
          )}
          <DeleteConfirmationModal id={selectServiceId} isOpen={eliminare} onClose={()=>setElimina(false)} onConfirm={eliminazione} serviceName={selectServiceTitle} />
          
     </>
  )
}

export default ServiziAttivi

