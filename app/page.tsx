import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "./components/Navbar";
import budgets from "./data";
import BudgetItem from "./components/BudgetItem";
import { DevicesProvider } from "./components/DevicesProvider";

export default function Home() {
  return (
    <DevicesProvider>
      <div>
        <Navbar />
        <div className="flex items-center justify-center w-full py-10">
          <div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                Prenez le contrôle <br /> de vos finances
              </h1>
              <p className="py-6 text-gray-800 text-center">
                Suivez vos budgets et vos dépenses <br /> en toute simplicité
                avec notre application intuitive !
              </p>
              <div className="flex justify-center align-center">
                <Link
                  href={"/sign-in"}
                  className="btn btn-sm md:btn-md btn-outline btn-accent"
                >
                  Se connecter
                </Link>
                <Link
                  href={"/sign-up"}
                  className="btn btn-sm md:btn-md ml-2 btn-accent"
                >
                  S'inscrire
                </Link>
              </div>

              <ul className="grid md:grid-cols-3 gap-4 mt-6 md:min-w-[1200px]">
                {budgets.map((budget) => (
                  <Link href={""} key={budget.id}>
                    <BudgetItem budget={budget} enableHover={1}></BudgetItem>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DevicesProvider>
  );
}
