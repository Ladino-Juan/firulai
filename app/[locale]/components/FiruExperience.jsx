"use client"

import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"


const FiruExperience = ({ model, name }) => {

  return (

    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Experience model={model} name={name}/>
    </Canvas>
   
  )
}

export default FiruExperience