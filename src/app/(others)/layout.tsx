import Navbar from "@/src/components/navbar";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      
    >
      <body className="min-h-full flex flex-col">
        
          <Navbar />
          {children}
        
      </body>
    </html>
  );
}
