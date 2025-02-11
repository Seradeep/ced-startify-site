import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+919363300704"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10"
    >
      <FaWhatsapp className="text-2xl md:text-3xl lg:text-4xl" />
    </a>
  );
};

export default WhatsAppButton;
