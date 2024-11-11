import DesktopSidebar from "@/components/shared/DesktopSidebar";
import MobileHeader from "@/components/shared/MobileHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <DesktopSidebar />
      <MobileHeader />
      <div className="root-container">
        <div> {children}</div>
      </div>
    </main>
  );
};

export default Layout;
