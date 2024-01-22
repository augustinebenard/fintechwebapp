"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { v4 as uuidv4 } from 'uuid';
import { IRole, User } from "../../model/user.model";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/user.slice";

const AddUser = ({ refetchData }: any) => {
const dispatch = useDispatch();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const roles = [
    { id: 2, name: "User" },
    { id: 3, name: "Admin" },
    { id: 4, name: "Others" },
  ];
  const [submitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ type: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    type: "",
    message: "",
  });

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const openAddUserModal = () => {
    setSuccessMessage({ type: "", message: "" });
    setErrorMessage({ type: "", message: "" });
    setSuccess(false);
    setError(false);
    setIsAddUserModalOpen(true);
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const saveUser = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(false);
  // create User 
  const savedUser:User = {
    ...user,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    active: true,
    accountNumber: Math.floor(Math.random() * 10000000000).toString() ,
    walletBalance: 0,
    transactionHistory: [],
  }
  dispatch(addUser(savedUser));

   
    setIsSubmitting(false);
  };
  const reset = (e: any) => {
    e.preventDefault();
    setUser({
      name: "",
      username: "",
      email: "",
      role: "",
      password: "",
    });
  };

  return (
    <>
      <button
        onClick={openAddUserModal}
        className="sm:mt-0 flex gap-2 items-center rounded bg-secondary-500 py-2 px-6"
      >
        <span className="text-sm font-medium text-white">Create New User</span>
        <UserPlusIcon className="h-5 w-5 text-white" aria-hidden="true" />
      </button>

      <Transition appear show={isAddUserModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAddUserModal}>
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
                    Add new User
                  </Dialog.Title>
                  <div className="flex max-w-md max-auto">
                    <div className="py-2">
                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          placeholder="e.g Augustine Benard"
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        ></input>
                      </div>
                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={user.username}
                          placeholder="Choose your preferred username"
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        ></input>
                      </div>
                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Email Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={user.email}
                          placeholder="e.g sample@email.com"
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        ></input>
                      </div>

                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                          Select Role
                        </label>
                        <select
                          onChange={(e) => handleChange(e)}
                          name="role"
                          value={user.role}
                          className="h-10 w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        >
                          {roles.map((role: any, idx: number) => (
                            <option key={idx}>{role.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                       password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          placeholder="Enter Password"
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2 border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:bg-white focus:border-pink-500 block"
                        ></input>
                      </div>

                      {error && (
                        <div
                          className="flex mt-2 items-center p-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                          role="alert"
                        >
                          <ExclamationCircleIcon />
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
                          <i className="fa fa-check-circle mr-1"></i>
                          <span className="sr-only">{"Success"}</span>
                          <div>
                            <span className="font-bold">{"Success"}!: </span>{" "}
                            {successMessage.message}
                          </div>
                        </div>
                      )}
                      <div className="h-10 my-4 space-x-4 pt-0">
                        <button
                          onClick={saveUser}
                          disabled={
                            user.email.length < 1 ||
                            user.name.length < 1 ||
                            user.role.length < 1 || 
                            user.username.length < 1 ||
                            submitting
                          }
                          className="flex gap-2 items-center w-full justify-center font-medium text-white bg-secondary-500 rounded py-2 px-6"
                        >
                          {submitting ? `Saving...` : "Add User"}
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

export default AddUser;
