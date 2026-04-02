import React from 'react'

export default async function AboutPage() {
  
  await new Promise((resolve) =>setTimeout(resolve, 5000));

  return (
    <div>This is About Page</div>
  )
}
