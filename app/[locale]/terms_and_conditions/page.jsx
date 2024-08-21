import React from 'react'
import { getlocales } from "../../actions";

const page = async ({params: lang}) => {
  const { terms_and_conditions } = await getlocales(lang.locale);
  return (
    <div className='flex justify-center items-center w-full lg:h-[200vh] h-[200vh]'>
      <div className='flex flex-col justify-center items-center lg:w-[50vw] w-[80vw] space-y-2 text-gray-500 py-4'>
        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.introTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.introText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.serviceTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.serviceText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.intellectualPropertyTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.intellectualPropertyText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.useTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.useText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.registrationTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.registrationText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.privacyTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.privacyText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.paymentsTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.paymentsText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.liabilityTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.liabilityText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.disputesTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.disputesText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.modificationsTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.modificationsText}
        </p>

        <h1 className='font-bold md:text-2xl text-sm w-full text-left'>
          {terms_and_conditions?.contactTitle}
        </h1>
        <p className='md:text-lg text-xs'>
          {terms_and_conditions?.contactText}
        </p>
      </div>
    </div>
  )
}

export default page