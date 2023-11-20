import { AnimatePresence, motion } from "framer-motion";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: JSX.Element;
  actions: JSX.Element;
  notification?: any;
  setNotification?: any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  actions,
  notification,
  setNotification,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-400/20 backdrop-blur-sm min-w-fit p-8 fixed inset-0 z-40 grid place-items-center overflow-y-scroll"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-white px-6 py-10 rounded-lg h-fit max-w-5xl shadow-xl cursor-default relative overflow-hidden"
          >
          
            <div className="flex flex-col w-full z-10">
              <div className="mb-10 text-4xl text-black font-bold w-fit mx-auto">
                {title}
              </div>
              {content}
            </div>
            <div className="flex gap-4 mt-10">{actions}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
