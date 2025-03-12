import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/(main)/SessionProvider";
import Navbar from "@/app/(main)/Navbar";
import MenuBar from "@/app/(main)/MenuBar";

export default async function Layout({ children }) {
  const session = await validateRequest();

  if (!session.user) {
    console.log("user not login");
    redirect("/login");
  }

  return (
    <SessionProvider value={session}>
      <div className="flex max-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar
            className={
              "sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-60"
            }
          />
          <main className="mx-auto w-full">{children}</main>
        </div>
        <MenuBar
          className={
            "sticky bottom-0 flex w-full justify-center gap-3 border-t bg-card p-3 sm:hidden"
          }
        />
      </div>
    </SessionProvider>
  );
}
