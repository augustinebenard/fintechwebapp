import { Dialog, Transition } from "@headlessui/react";
import {
  ArchiveBoxArrowDownIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../model/user.model";
import { fundUserWallet } from "../../redux/userList.slice";


const FundWallet = () => {
  const users = useSelector((state: any) => state.users);
  
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
    description: "",
  });
  const loggedInUser:User = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  ).loggedInUser;
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    const value = event.target.value;
    setFundPayload({ ...fundPayload, [event.target.name]: value });
  };

  const fundWallet = (e: any) => {
    e.preventDefault();
    const user = users.find((user: any) => user.id === loggedInUser?.id);
    const newBalance =
      parseInt(user.walletBalance) + parseInt(fundPayload.amount);
    const newTransaction = {
      id: uuidv4(),
      date: new Date().toISOString().slice(0, 10),
      description: fundPayload.description,
      type: "credit",
      amount: parseInt(fundPayload.amount),
      sender: "myself",
    };
    const newTransactionHistory = [...user.transactionHistory, newTransaction];
    const newUser = {
      ...user,
      walletBalance: newBalance,
      transactionHistory: newTransactionHistory,
    };

    dispatch(fundUserWallet(newUser));
    // dispatch(setLoggedInUserData(newUser));
    // dispatch(authActions.updateLoggedInUser(newUser));
    setSuccess(true);
    setSuccessMessage({
      type: "Success",
      message: "Wallet funded successfully",
    });
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
        className="sm:mt-0 flex gap-2 items-center rounded bg-FFE6E6 py-2 px-2 w-[132px]"
      >
        <ArchiveBoxArrowDownIcon
          className="h-5 w-5 text-secondary-500"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-secondary-500">
          Fund Wallet
        </span>
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
                    Fund Wallet
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
                      </div>
                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Description
                        </label>
                        {/* create a text area with 3 rows */}
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
                          onClick={fundWallet}
                          disabled={
                            fundPayload.amount == "" ||
                            fundPayload.description === ""
                          }
                          className="flex gap-2 items-center w-full justify-center font-medium text-white bg-secondary-500 rounded py-2 px-6"
                        >
                          Fund Wallet
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

export default FundWallet;
