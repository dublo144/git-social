import { Outlet } from "@remix-run/react";
import Header from "~/components/layout/Header";
import Sidebar from "~/components/layout/Sidebar";

export default function Home() {
  // TODO: Move to sidenav
  // const { supabase } = useOutletContext<SupabaseOutletContextType>();

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  // };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <div className="flex h-full">
          <Sidebar />
          <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto mb-14">
            <div className="flex w-full p-6">
              <div className="flex flex-col w-full min-h-screen">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
