"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { checkAndAddUser } from "../actions";
import Devices from "./Devices";

const Navbar = () => {
   const { isLoaded, isSignedIn, user } = useUser();
    useEffect(() => {
    if(user?.primaryEmailAddress?.emailAddress){
      checkAndAddUser(user?.primaryEmailAddress?.emailAddress)
    }
  },[user])

  return (
    <div className="bg-base-200/30 px-5 md:px-[10%] py-4">
      {isLoaded &&
        (isSignedIn ? (
          <>
            <div className="flex justify-between items-center">
              <div className="flex text-2xl items-center font-bold">
                e <span className="text-accent">.Track</span>
              </div>

              <div className="md:flex hidden ">
                <Link href={"/budgets"} className="btn mx-4">
                  Mes Budgets
                </Link>
                <Link href={"/dashboard"} className="btn mx-4">
                  Tableau de bord
                </Link>
                <Link href={"/transactions"} className="btn mx-4">
                  Mes transactions
                </Link>
              <Devices className="btn" />
              </div>
              <UserButton />
            </div>

            <div className="md:hidden flex mt-2 justify-center items-center flex-wrap">
              <Link href={"/budgets"} className="btn mx-4 btn-sm">
                Mes Budgets
              </Link>
              <Link href={"/dashboard"} className="btn mx-4 btn-sm">
                Tableau de bord
              </Link>
              <Link href={"/transactions"} className="btn mx-4 btn-sm mt-2 mb-2">
                Mes transactions
              </Link>
              <Devices className="btn mx-4 btn-sm" />
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex text-2xl items-center font-bold">
              e <span className="text-accent">.Track</span>
            </div>
            <div className="flex mt-2 justify-center">
              <Link href={"/sign-in"} className="btn mx-4">
                Se connecter
              </Link>
              <Link href={"/sign-up"} className="btn mx-4 btn-accent">
                S'inscrire
              </Link>
            </div>
          </div>
        ))}
    </div>
    
  );
};

export default Navbar;
