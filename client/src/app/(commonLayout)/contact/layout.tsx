import React from 'react'

export default function ContactLayout({children}: {children:React.ReactNode}) {
  return (
    <div> 
        <h1>this is Contact Layout</h1>
        {children}
    </div>
  )
}
