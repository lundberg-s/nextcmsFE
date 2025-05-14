import Link from "next/link";
import { Button } from "@/cms/components/ui/button";
import { usePage } from "@/cms/lib/hooks/usePage";
import { DialogModal } from "./modal/DialogModal";
import { LoginForm } from "@/shared/features/auth/LoginForm";

export default function PageNavigation() {
  const { pages } = usePage();

  const login = {
    title: "Login",
    description: "Enter your credentials to login",
    icon: "login",
    form: LoginForm,
    button: {
      label: "Login",
      icon: "login",
      variant: "default",
    },
  };

  return (
    <div className="absolute w-full">
      <nav className="container mx-auto flex justify-between items-center p-5">
        <h1 className="text-xl font-bold text-gray-800 left-10">
          <Link href="/">MyApp</Link></h1>

        <ul className="flex space-x-6 text-xl font-bold">
          {pages?.map((page) => (
            <li key={page.id}>
              <Link href={page.slug}>{page.title}</Link>
            </li>
          ))}
        </ul>
        <DialogModal
          key={login.title}
          title={login.title}
          description={login.description}
          content={login.form}
          button={login.button}
        />
      </nav>
    </div >
  );
}
