import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/sections/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConditionalHeader />
      {children}
      <Footer />
    </>
  );
}