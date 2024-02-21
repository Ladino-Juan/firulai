"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

const ButtonCheckout = ({ priceId, userId, petId, isPro = false, index }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return "bg-darkOrange hover:bg-orange-500 transition-all duration-300";
      case 1:
        return "bg-darkPurple hover:bg-blue-700 transition-all duration-300";
      case 2:
        return "bg-lightGreen hover:bg-green-600 transition-all duration-300";
      default:
        return "bg-lightGreen hover:bg-green-600 transition-all duration-300";
    }
  };

  const buttonBackgroundColor = getBackgroundColor(index);

  return (
    <button
      className={`${buttonBackgroundColor} text-white px-4 py-2 rounded-lg hover:scale-105`}
      onClick={async () => {
        if (userId) {
          try {
            setIsLoading(true);
            const res = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify({
                priceId, petId
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            window.location.href = data.url;
          } catch (error) {
            console.error("Error occurred:", error);
          } finally {
            setIsLoading(false)
          }
          
        }
        else {
      router.push('/sign-in');
    }
      }}
      disabled={isLoading}
    >
      {isPro ? "Manage Subscription" : "Apadrinar"}
    </button>
  );
};

export default ButtonCheckout;
