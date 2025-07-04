"use client";
import {
  addTransactionToBudget,
  deleteBudget,
  deleteTransaction,
  getTrasactionsByBudgetId,
} from "@/app/actions";
import BudgetItem from "@/app/components/BudgetItem";
import Wrapper from "@/app/components/Wrapper";
import budgets from "@/app/data";
import { Budget } from "@/type";
import React, { useContext, useEffect, useState } from "react";
import Notification from "@/app/components/Notification";
import { Send, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { DevicesContext, DevicesProvider } from "@/app/components/DevicesProvider";

const Page = ({ params }: { params: Promise<{ budgetId: string }> }) => {
  const { currentSymbol } = useContext(DevicesContext);
  const [budgetId, setbudgetId] = useState<string>("");
  const [budget, setBudget] = useState<Budget>();
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [notification, setNotification] = useState<string>("");
  const closeNotification = () => {
    setNotification("");
  };

  async function fetchBudgetData(budgetId: string) {
    try {
      if (budgets) {
        const budgetData = await getTrasactionsByBudgetId(budgetId);
        setBudget(budgetData);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la recuperation du budget et de la transaction:",
        error
      );
    }
  }

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setbudgetId(resolvedParams.budgetId);
      fetchBudgetData(resolvedParams.budgetId);
    };
    getId();
  }, [params]);
  const handleAddTransaction = async () => {
    if (!amount || !description) {
      setNotification("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        throw new Error();
      }
      const newTransaction = await addTransactionToBudget(
        budgetId,
        amountNumber,
        description
      );
      setNotification("Transaction ajouté avec succès");
      fetchBudgetData(budgetId);
      setAmount("");
      setDescription("");
    } catch (error: any) {
      setNotification(`Erreur: ${error.message}`);
    }
  };

  const handleDeleteBudget = async () => {
    const confirmed = window.confirm(
      "Etes vous sur de vouloir suprrimer ce budget et toutes ses transactions associées ?"
    );
    if (confirmed) {
      try {
        await deleteBudget(budgetId);
      } catch (error) {
        console.error("Erreur lors de la suppression du budget:", error);
      }
      redirect("/budgets")
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Etes vous sur de vouloir suprrimer cette transaction ?"
    );
    if (confirmed) {
      try {
        await deleteTransaction(transactionId);
        fetchBudgetData(budgetId)
        setNotification('Depenses supprimer')
      } catch (error) {
        console.error("Erreur lors de la suppression de la transaction:", error);
      }
    }
  }

  return (
    <DevicesProvider>
      <Wrapper>
        {notification && (
          <Notification
            message={notification}
            onclose={closeNotification}
          ></Notification>
        )}
        {budget && (
          <div className="flex md:flex-row flex-col">
            <div className="md:w-1/3">
              <BudgetItem budget={budget} enableHover={0} />
              <button onClick={() => handleDeleteBudget()} className="btn mt-4">
                supprimer le budget
              </button>
              <div className="space-y-4 flex flex-col mt-4">
                <input
                  type="text"
                  id="description"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="input input-bordered"
                  required
                />

                <input
                  type="number"
                  value={amount}
                  placeholder="Montant"
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-bordered mb-3"
                  required
                />

                <button onClick={handleAddTransaction} className="btn">
                  Ajouter votre depenses
                </button>
              </div>
            </div>
            {budget?.transactions && budget.transactions.length > 0 ? (
              <div className="overflow-x-auto md:mt-0 mt-4 md:w-2/3 ml-4">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Montant</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Heure</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget?.transactions?.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="text-lg md:text-3xl">
                          {transaction.emoji}
                        </td>
                        <td>
                          <div className="badge badge-accent badge-xs md:badge-sm">
                            - {transaction.amount} {currentSymbol}
                          </div>
                        </td>
                        <td>{transaction.description}</td>
                        <td>
                          {transaction.createdAt.toLocaleDateString("fr-FR")}
                        </td>
                        <td>
                          {transaction.createdAt.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="btn btn-sm"
                          >
                            <Trash className="w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="md:w-2/3 mt-10 md:ml-4 flex items-center justify-center">
                <Send strokeWidth={1.5} className="w-8 h-8 text-accent" />
                <span className="text-gray-500 ml-2">Acune Transaction .</span>
              </div>
            )}
          </div>
        )}
      </Wrapper>
    </DevicesProvider>

  );
};

export default Page;
