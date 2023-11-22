import { XIcon } from "@heroicons/react/outline";

export default function Modal({ open, onClose, children }) {
    return (
      // backdrop
      <div
        onClick={onClose}
        className={`
          
        fixed inset-0 flex justify-center items-center transition-colors
          ${open ? "visible bg-black/10" : "invisible"}
        `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            fixed background-image rounded-3xl shadow p-6 transition-all w-2/4 h-2/4 max-sm:w-[80vw] max-sm:h-[60vh]
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full text-black bg-white shadow-2xl hover:bg-white hover:text-black"
          >
            <XIcon className="w-3"/>
          </button>
          {children}
        </div>
      </div>
    )
  }