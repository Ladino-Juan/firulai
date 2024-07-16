"use client"

import { useState } from "react";
import emailjs from "@emailjs/browser";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        "service_q6cwdcs",
        "template_237behg",
        event.target,
        "jMIiba1hr0SbtDCwa"
      )
      .then(alert("mensaje enviado"))
      .catch((error) => console.log(error));
  };

  return (
    <form
      className="w-[90vw] h-screen max-sm:h-[120vh] flex flex-col font-poppins bg-blanco items-center justify-center py-20"
      onSubmit={sendEmail}
      id="contacto"
    >
      <h1 className="text-4xl font-semibold text-center mb-5 text-gray-500 max-sm:text-2xl w-2/4 max-sm:w-3/4">
        Agenda una reunión virtual <span className="text-orange-500">AQUÍ</span>
      </h1>
      <p className="text-xl font-medium text-center w-3/4 mb-10 text-gray-500">
        {" "}
        ¡Estamos ansiosos por ayudarte a alcanzar tus metas empresariales! Si
        tienes alguna pregunta antes de llenar el formulario, no dudes en
        contactarnos directamente. 
      </p>
      <input
        placeholder="nombre"
        type="text"
        className="text-sm mb-4 rounded-lg  w-2/4 p-3 bg-gray-200 border-gray-200 placeholder-gray-400 text-gray max-sm:w-[80vw]"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        placeholder="celular"
        type="tel"
        className="text-sm mb-4 rounded-lg w-2/4 p-3 bg-gray-200 border-gray-200 placeholder-gray-400 text-gray max-sm:w-[80vw]"
        id="celular"
        name="celular"
        value={formData.celular}
        onChange={handleChange}
        required
      />
      <input
        placeholder="email"
        type="email"
        className="text-sm mb-4 rounded-lg w-2/4 p-3 bg-gray-200 border-gray-200 placeholder-gray-400 text-gray max-sm:w-[80vw]"
        id="correo"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        required
      />

      <textarea
        placeholder="mensaje"
        className="text-sm mb-4 rounded-lg w-2/4 p-3 bg-gray-200 border-gray-200 placeholder-gray-400 text-gray max-sm:w-[80vw]"
        id="mensaje"
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-36 p-2 text-base max-sm:text-sm font-semibold bg-orange-500 hover:bg-white text-white hover:text-black border border-gray-700 hover:border-transparent rounded-xl transition-all duration-700 hover:shadow-md border-none"
        aria-label="Enviar formulario"
      >
        <span className="py-2">ENVIAR</span>
      </button>
    </form>
  );
};

export default Formulario;
