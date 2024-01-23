import {
  CheckCircleIcon,
  ChevronDoubleRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useState } from "react";
import { User } from "../../model/user.model";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { creditUserWallet, debitFromUserWallet } from "../../redux/userList.slice";

const TransferFund = () => {
  const users = useSelector((state: any) => state.users);
  const loggedInUser: User = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  ).loggedInUser;
  const dispatch = useDispatch();
  const sender: User = users.find((user: User) => user.id === loggedInUser?.id);

  const [foundUser, setFoundUser] = useState<User>();
  const [accountLimitNotice, setAccountLimitNotice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ type: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    type: "",
    message: "",
  });
  const [fundPayload, setFundPayload] = useState({
    amount: "",
    accountNumber: "",
    description: "",
  });
  const fetchUserByAccountNumber = (accountNumber: string) => {
    const user = users.find(
      (user: any) => user.accountNumber === accountNumber
    );
    if (user) {
      setFoundUser(user);
    } else {
      setFoundUser(undefined);
    }
  };

  const handleChange = (event: any) => {
    const value = event.target.value;

    if (event.target.name === "accountNumber") {
      fetchUserByAccountNumber(value);
    }
    if (event.target.name === "amount") {
      if (
        sender &&
        sender.walletBalance &&
        parseInt(value) > sender.walletBalance
      ) {
        setAccountLimitNotice(
          `You cannot transfer more than ${sender.walletBalance}`
        );
      } else {
        setAccountLimitNotice("");
      }
    }
    setFundPayload({ ...fundPayload, [event.target.name]: value });
  };

  const transfer = (e: any) => {
    e.preventDefault();
    const user = users.find((user: any) => user.id === loggedInUser?.id);
    // check if you are not sending moeny to yourself
    if (user?.accountNumber === fundPayload.accountNumber) {
      setError(true);
      setErrorMessage({
        type: "Error",
        message: "You cannot transfer money to yourself",
      });
      return;
    }
    const newBalance =
      parseInt(user.walletBalance) - parseInt(fundPayload.amount);
    const newTransaction = {
      id: uuidv4(),
      date: new Date().toISOString().slice(0, 10),
      description: fundPayload.description,
      type: "debit",
      amount: parseInt(fundPayload.amount),
      sender: foundUser?.name,
    };
    const newTransactionHistory = [...user.transactionHistory, newTransaction];

    const newUser = {
      ...user,
      walletBalance: newBalance,
      transactionHistory: newTransactionHistory,
    };

    dispatch(debitFromUserWallet(newUser));

    const receiver = users.find(
      (user: any) => user.accountNumber === fundPayload.accountNumber
    );
    const receiverNewBalance =
      parseInt(receiver.walletBalance) + parseInt(fundPayload.amount);
    const receiverNewTransaction = {
      id: uuidv4(),
      date: new Date().toISOString().slice(0, 10),
      description: fundPayload.description,
      type: "credit",
      amount: parseInt(fundPayload.amount),
      sender: user.name,
    };
    const receiverNewTransactionHistory = [
      ...receiver.transactionHistory,
      receiverNewTransaction,
    ];
    const newReceiver = {
      ...receiver,
      walletBalance: receiverNewBalance,
      transactionHistory: receiverNewTransactionHistory,
    };
    dispatch(creditUserWallet(newReceiver));
    
    setSuccess(true);
    setSuccessMessage({
      type: "Success",
      message: `
        You have successfully transferred ${fundPayload.amount} to ${foundUser?.name}
        
      `,
    });
    setFundPayload({ amount: "", description: "", accountNumber: "" });
    setFoundUser(undefined);
    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setSuccessMessage({ type: "", message: "" });
    setErrorMessage({ type: "", message: "" });
    setSuccess(false);
    setError(false);
    setIsModalOpen(true);
  };
  return (
    <>
      <button
        onClick={openModal}
        className="sm:mt-0 flex gap-2 items-center rounded bg-secondary-500 py-2 px-6 w-[132px]"
      >
        <span className="text-sm font-medium text-white">Tranfer</span>
        <ChevronDoubleRightIcon
          className="h-5 w-5 text-white"
          aria-hidden="true"
        />
      </button>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Transfer Funds
                  </Dialog.Title>
                  <div className="flex max-w-md max-auto">
                    <div className="py-2">
                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Amount
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={fundPayload.amount}
                          placeholder="e.g 30000"
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        ></input>
                        <small>
                          {accountLimitNotice && (
                            <span className="text-red-500 italic font-medium">
                              {accountLimitNotice}
                            </span>
                          )}
                        </small>
                      </div>
                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Account Number
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={fundPayload.accountNumber}
                          placeholder="0043231232"
                          maxLength={10}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        ></input>
                        <small className="text-secondary-500 font-bold">
                          {foundUser &&
                            foundUser.name &&
                            foundUser.name.toUpperCase()}
                        </small>
                      </div>
                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={fundPayload.description}
                          onChange={(e) => handleChange(e)}
                          rows={3}
                          placeholder="e.g Write a description"
                          className=" w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        ></textarea>
                      </div>

                      {error && (
                        <div
                          className="flex mt-2 items-center p-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                          role="alert"
                        >
                          <ExclamationCircleIcon className="h-5 w-5 text-secondary-500" />
                          <span className="sr-only">{errorMessage.type}</span>
                          <div>
                            <span className="font-bold">
                              {errorMessage.type}!:{" "}
                            </span>
                            {errorMessage.message}
                          </div>
                        </div>
                      )}
                      {success && (
                        <div
                          className="flex mt-2 items-center p-2 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                          role="alert"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                          <span className="sr-only">{"Success"}</span>
                          <div>
                            <span className="font-bold">{"Success"}!: </span>{" "}
                            {successMessage.message}
                          </div>
                        </div>
                      )}
                      <div className="h-10 my-4 space-x-4 pt-0">
                        <button
                          onClick={transfer}
                          disabled={
                            fundPayload.amount == "" ||
                            !foundUser ||
                            accountLimitNotice != "" ||
                            fundPayload.description === ""
                          }
                          className="flex gap-2 items-center w-full justify-center font-medium text-white bg-secondary-500 rounded py-2 px-6"
                        >
                          Transfer Money
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TransferFund;
