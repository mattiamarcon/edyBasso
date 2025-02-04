import React from 'react'

async function page({
    params,
}:{
    params:Promise<{serviceID:string}>
}) {

    const serviceID= (await params).serviceID;
  return (
    <div>Servizio numero: {serviceID}</div>
  )
}

export default page