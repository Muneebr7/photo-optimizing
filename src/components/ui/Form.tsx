'use client'
import { useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import Image from 'next/image'

export default  function Form() {
    
    const [preview , setPreview ] = useState("")
    const [optimizeImage , setOptimizeImage] = useState("")

    const previewImage = (e :any) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = async (e :any) => {
        e.preventDefault()
        const file = await e.target['file']
        const image = file.files[0]
        
        if(image){
            try {
                const imageForm = new FormData()
                imageForm.append('image', image)
                const res = await fetch('/api/upload' , {
                    method: 'POST',
                    body: imageForm
                })
                console.log(imageForm)
                const data = await res.json()
                setOptimizeImage(data.covertedImage)

            } catch (error) {
                console.log(error)
            }
        }
    }
  
    return (
    <>
      <form className="text-white space-y-10" onSubmit={handleSubmit}>
        <label> Image 
        <Input type="file" name="file" onChange={previewImage}/>
        </label>
        
        <div className='flex gap-10'>
        {preview && <Image 
        src={preview}
        width={200}
        height={200}
        alt="preview"
       /> }

       {/* {optimizeImage && <Image 
        src={optimizeImage}
        width={200}
        height={200}
        alt="preview" 
        /> } */}
        </div>
        
       

      <Button className="bg-white text-black hover:text-white rounded-none" type='submit'>
        Upload Image
      </Button>
    </form>
 
 
    </>
  )
}
