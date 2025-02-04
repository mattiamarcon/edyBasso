"use client"

import React from 'react'
import { supabaseClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
import ServiceForm from '../components/serviceForm';



function page() {

    const supabase= supabaseClient();
    const router= useRouter();


  return (
    <div>
        <p>ZONA PRIVATA</p>
        <ServiceForm />
        <ul className='my-10'>
          <h1>LISTA SERVIZI</h1>
          <li></li>
        </ul>
    </div>
  )
}

export default page