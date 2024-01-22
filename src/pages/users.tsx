import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { emptyState as empty } from "../assets/images";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AddUser from "../components/Modal/addUser";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { deleteUser } from "../redux/userList.slice";

const UserManagement = () => {
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
  };

  const deleteUserById = (e: any, id: string) => {
    e.preventDefault();
    dispatch(deleteUser({ id }));
  };

  return (
    <>
      <div className="px-6 py-4">
        <h1 className="text-4xl my-4 font-bold">
          <span className="text-primary-800">User Management</span>
        </h1>
        <div className="mt-4 flow-root">
          <div className="flex my-4 justify-end">
            <AddUser />
          </div>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 min-h-[80vh]">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full bg-white shadow   divide-y divide-B3261E">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-bold text-surfaceVariant-neutral30 "
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                    >
                      Account Number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                    >
                      Account Balance
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-Z79747E1A relative">
                  {users?.length > 0 ? (
                    <>
                      {users?.map((request: any, idx: number) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                            {request.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                            {request.username}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                            {request.email}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                            {request.accountNumber}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                            {formatAmount(request.walletBalance)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                            {request.role}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                            {request.active ? (
                              <div className="text-green-600 font-semibold">
                                Active
                              </div>
                            ) : (
                              <div className="text-red-600 font-semibold">
                                Inactive
                              </div>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => deleteUserById(e, request.id)}
                                className="flex items-center space-x-2"
                              >
                                <TrashIcon className="w-4 h-4 text-red-600" />
                                <span className="text-red-600 font-semibold">
                                  Delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute w-full">
                      <div
                        className="text-center"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={empty}
                          alt="empty table"
                          className="my-5"
                          width={100}
                          height={100}
                        />
                        <p className="text-Z667085">
                          There are currently no users
                        </p>
                      </div>
                      <div className="my-6">
                        <AddUser />
                      </div>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
