import { clerkClient } from "@clerk/nextjs";
import { headers } from "next/headers";
import Image from "next/image";

const page = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  // Regex pattern to match and capture everything after /[locale]/
  const regex = /^\/[a-z]{2}\/(.*)$/;
  const match = pathname.match(regex);

  // Extract the part after /[locale]/
  const cleanedPathname = match ? match[1] : pathname;


  const response = await clerkClient.users.getUserList({
    username: cleanedPathname,
  });



  return (
    <div className="w-[95vw] h-screen flex justify-center items-center">
      <h1 className="font-bold text-3xl text-center text-gray-700">{`${response[0].firstName} ${response[0].lastName}`}</h1>

      <Image src={response[0].imageUrl} alt="firulai" className="rounded-full" width={50} height={50}/>
    </div>
  );
};

export default page;
