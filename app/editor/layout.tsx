import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Workspace | 5ingular Graphic",
  description: "Workspace editor kreatif profesional berbasis web.",
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-zinc-100 select-none flex flex-col">
      {children}
    </div>
  );
}
