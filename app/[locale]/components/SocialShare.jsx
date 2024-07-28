"use client";
import React, { useState } from "react";
import Copy from "@icons/copy-icon.svg";
import Image from "next/image";

const SocialShare = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <div className={`group absolute top-20 left-5`} onClick={copyToClipboard}>
  
      <Image
        src={Copy}
        alt="Info Firulai"
        className="opacity-20"
        height={15}
        width={15}
        quality={100}
      />
   
   
     

      <span class="text-left absolute top-10 scale-0 rounded-lg bg-green-500 p-2 text-xs text-white group-hover:scale-100">
        {copied ? "Copiado!" : "Copiar"}
      </span>
    </div>
  );
};

export default SocialShare;
