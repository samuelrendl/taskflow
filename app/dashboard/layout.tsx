import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SessionProvider>
        <nav>sidebar</nav>
        <main>{children}</main>
      </SessionProvider>
    </div>
  );
};

export default Layout;
