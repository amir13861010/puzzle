import { Send } from "lucide-react";

export default function SupportButton() {
  return (
    <a
      href="https://t.me/puzzleio_ir"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="پیام به پشتیبانی در تلگرام"
      title="پشتیبانی در تلگرام: @puzzleio_ir"
      className="fixed bottom-5 left-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-[#229ED9] text-white shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-1 hover:bg-[#168dcc] active:translate-x-0.5 active:translate-y-0.5"
    >
      <Send className="h-6 w-6 -translate-x-0.5 translate-y-0.5" aria-hidden="true" />
    </a>
  );
}
