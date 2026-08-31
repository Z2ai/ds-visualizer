import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Data Structures Visualization",
  description: "Interactive visual simulator for core data structures — Array, Stack, Queue, Circular Queue, Linked List, and Circular Linked List.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="md:flex min-h-screen">
          <Sidebar />
                    <main className="flex-1 bg-[var(--color-bg)] min-h-screen pt-14 md:pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}