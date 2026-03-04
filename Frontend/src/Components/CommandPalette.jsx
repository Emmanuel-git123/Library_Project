import { Command } from "cmdk";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [theses, setTheses] = useState([]);
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!open) return;

    const fetchThesis = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/thesis");
        const data = await res.json();

        if (!res.ok) {
          toast.error("Failed to fetch thesis");
          return;
        }

        setTheses(data.required_thesis || []);
      } catch (err) {
        toast.error("Server error");
      }
    };

    fetchThesis();
  }, [open]);

  const handleOutsideClick = (e) => {
    if (e.target === overlayRef.current) {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          onClick={handleOutsideClick}
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs border-green-300 border-8 flex items-start justify-center pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Command className="w-[600px] max-w-[90%] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              
              <div className="border-b px-4 py-3">
                <Command.Input
                  placeholder="Search thesis..."
                  className="w-full outline-none text-sm placeholder-gray-400"
                />
              </div>

              <Command.List className="max-h-[350px] overflow-y-auto p-2">
                <Command.Empty className="text-center text-sm text-gray-500 py-6">
                  No thesis found.
                </Command.Empty>

                <Command.Group
                  heading="Theses"
                  className="text-xs text-gray-400 px-2 mb-1"
                >
                  {theses.map((thesis) => (
                    <Command.Item
                      key={thesis._id}
                      value={`${thesis.title} ${thesis.author?.name} ${thesis.year}`}
                      onSelect={() => {
                        navigate(`/thesis/${thesis._id}`);
                        setOpen(false);
                      }}
                      className="px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-50 aria-selected:bg-blue-100 transition"
                    >
                      <div className="font-medium text-gray-800">
                        {thesis.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {thesis.author?.name} • {thesis.year}
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}