import Image from "next/image"
import LogoGif from '../public/assets/logoLoader.gif'

export default function Loading(){
  return (
    <Image  src={LogoGif}
    alt="Firulais loader"
    width={30}
    quality={100}></Image>
  )
}
