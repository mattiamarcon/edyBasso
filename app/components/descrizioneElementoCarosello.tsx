"use client"

import Image from "next/image";

interface contentType{
    foto:string,
    titolo:string,
    descrizione:string
}

export default function DescrizioneElementoCarosello({foto,titolo,descrizione}:contentType){
    return (
      <>
              <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                
                {descrizione}
              </p>
              <Image
                src={foto}
                alt="contenuto non accessibile al momento"
                height="500"
                width="500"
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
              />
            </div>
      </>
    );
  };

