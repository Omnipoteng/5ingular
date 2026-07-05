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
  return <>{children}</>;
}
