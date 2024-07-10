import { UserButton } from "@clerk/nextjs";
import React from "react";

export const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="flex-grow md:w-[calc(100%-300px)]">
        <header className="h-[60px] border-b border-black/10">
          <div className="pt-[15px] pl-[30px]">
            <UserButton />
          </div>
        </header>
        <main className="overflow-auto">{children}</main>
      </div>
      <aside className="w-full md:w-[300px] border-t md:border-l border-black/10">
        <div className="p-4">Suggestions</div>
      </aside>
    </div>
  );
};

export default DashboardLayout;
