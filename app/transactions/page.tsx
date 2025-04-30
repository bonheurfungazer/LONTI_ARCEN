"use client";

import { Transaction } from "@/type";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getTransactionsByEmailAndPeriod } from "../actions";
import Wrapper from "../components/Wrapper";
import TransactionsItems from "../components/TransactionItem";
import { DevicesProvider } from "../components/DevicesProvider";

const page = () => {
  const { user } = useUser();
  const [transactions, setTransaction] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTransactions = async (period: string) => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      try {
        const transactionData = await getTransactionsByEmailAndPeriod(
          user?.primaryEmailAddress?.emailAddress,
          period
        );
        setTransaction(transactionData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la recuperation des transaction", err);
      }
    }
  };

  useEffect(() => {
    fetchTransactions("last30");
  }, [user?.primaryEmailAddress?.emailAddress]);
  return (
    <DevicesProvider>
      <Wrapper>
        <div className="flex justify-end">
          <select
            className="input input-bordered input-md"
            defaultValue="last30"
            onChange={(e) => fetchTransactions(e.target.value)}
          >
            <option value="last7">Dernier 7 jours</option>
            <option value="last30">Dernier 30 jours</option>
            <option value="last90">Dernier 90 jours</option>
            <option value="last365">Dernier 365 jours</option>
          </select>
        </div>

        <div className="overflow-x-auto w-full bg-base-200/35 rounded-xl">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-gray-500 text-sm">
                Aucune transaction à afficher.
              </span>
            </div>
          ) : (
            <ul className="divide-y divide-base-300">
              {transactions.map((transaction) => (
                <TransactionsItems
                  key={transaction.id}
                  transaction={transaction}
                ></TransactionsItems>
              ))}
            </ul>
          )}
        </div>
      </Wrapper>
    </DevicesProvider>
  );
};

export default page;
