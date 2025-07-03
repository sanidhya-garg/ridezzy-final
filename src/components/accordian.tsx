import { useState } from 'react';

type AccordionItemProps = {
  title: string;
  content: string;
};

export const AccordionItem = ({ title, content }: AccordionItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-yellow-300 py-4">
      <button
        className="w-full flex justify-between items-center text-left font-semibold text-black"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span>{open ? '-' : '+'}</span>
      </button>
      {open && <p className="mt-2 text-sm text-gray-700">{content}</p>}
    </div>
  );
};
