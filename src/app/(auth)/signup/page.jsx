import signupImage from "@/assets/dose-juice.jpg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/app/(auth)/signup/SignUpForm";

export const metadata = {
  title: "Sign Up",
};

export default function Page(props) {
  return (
    <main className={"flex h-screen items-center justify-center p-5"}>
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className={"text-3xl font-bold text-primary"}>Рестрація</h1>
            <p className={"text-muted-foreground"}>
              Це місце де ви знайдете свою{" "}
              <span className={"font-bold italic text-primary"}>здорову</span>{" "}
              їжу
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link
              href={"/login"}
              className={"block text-center hover:underline"}
            >
              Вже зареєстровані у нас?{" "}
              <span className={"text-primary"}>Тоді заходьте!</span>
            </Link>
          </div>
        </div>

        <Image
          src={signupImage}
          alt="Decor photo"
          className="hidden w-1/2 rounded-2xl object-cover md:block"
        />
      </div>
    </main>
  );
}
