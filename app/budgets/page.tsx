"use client";

import React, { Children, useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { addBudget, getBudgetsByUser } from "../actions";
import Notification from "../components/Notification";
import { Budget } from "@/type";
import Link from "next/link";
import BudgetItem from "../components/BudgetItem";
import { Landmark } from "lucide-react";
import { DevicesProvider } from "../components/DevicesProvider";

const Page = () => {
  const { user } = useUser();
  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const handleEmojiSelect = (emojiObject: { emoji: string }) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const [budgets, setBudgets] = useState<Budget[]>([]);

  const [notification, setNotification] = useState<string>("");
  const closeNotification = () => {
    setNotification("");
  };

  const handleAddBudget = async () => {
    try {
      const amount = parseFloat(budgetAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Le montant doit etre un nombre positif.");
      }

      await addBudget(
        user?.primaryEmailAddress?.emailAddress as string,
        budgetName,
        amount,
        selectedEmoji
      );

      fetchBudgets();

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }

      setNotification("Nouveau Budget crée avec succès");
      setBudgetName("");
      setBudgetAmount("");
      setSelectedEmoji("");
      setShowEmojiPicker(false);
    } catch (error) {
      setNotification(` ${error}`);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [user?.primaryEmailAddress?.emailAddress, fetchBudgets]);

  const fetchBudgets = useCallback(async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const userBudgets = await getBudgetsByUser(
          user?.primaryEmailAddress?.emailAddress
        );
        setBudgets(userBudgets);
      } catch (error) {
        setNotification(`Erreur lors de la recuperation du Budget: ${error}`);
      }
    }
  }, [user?.primaryEmailAddress?.emailAddress, setBudgets, setNotification]);
  return (
    <DevicesProvider>
      <Wrapper>
        {notification && (
          <Notification
            message={notification}
            onclose={closeNotification}
          ></Notification>
        )}

        <button
          className="btn mb-4"
          onClick={() =>
            (
              document.getElementById("my_modal_3") as HTMLDialogElement
            ).showModal()
          }
        >
          Nouveau Budget
          <Landmark className="w-4" />
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Creation D'un Budget</h3>
            <p className="py-4">Permet de controler ses depenses facilement</p>
            <div className="w-full flex flex-col">
              <input
                type="text"
                value={budgetName}
                placeholder="Nom du budget"
                onChange={(e) => setBudgetName(e.target.value)}
                className="input input-bordered mb-3"
                required
              />

              <input
                type="number"
                value={budgetAmount}
                placeholder="Montant du budget"
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="input input-bordered mb-3"
                required
              />
              <button
                className="btn mb-3"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {selectedEmoji || "selectionnez un emoji 🫵"}
              </button>

              {showEmojiPicker && (
                <div className="flex justify-center items-center my-4">
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
              )}
              <button onClick={handleAddBudget} className="btn">
                Ajouter Budget
              </button>
            </div>
          </div>
        </dialog>

        <ul className="grid md:grid-cols-3 gap-4">
          {budgets.map((budget) => (
            <Link href={`/manage/${budget.id}`} key={budget.id}>
              <BudgetItem budget={budget} enableHover={1}></BudgetItem>
            </Link>
          ))}
        </ul>
      </Wrapper>
    </DevicesProvider>
  );
};

export default Page;
