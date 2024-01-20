import { useSelector } from "react-redux";
import Button from "../components/Button";
import { emptyState as empty } from "../assets/images";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AddUser from "../components/Modal/addUser";


const UserManagement = () => {
  const users = useSelector((state: any) => state.users);


  // const createUserHandler = async (event: React.FormEvent<HTMLFormElement>) => {
  //   // setIsLoadingCreateUser(true);
  //   event.preventDefault();
  //   const payLoad = {
  //     username: username,
  //     roleId: role === "super_admin" ? 1 : 2,
  //   };
  //   try {
  //     // const res = await AdminApis.createAdminUser(payLoad);
  //   } catch (error) {
  //     const errorMsg: any = error;

  //     // toast.error(errorMsg?.message);
  //   } finally {
  //     setIsLoadingCreateUser(false);
  //     closeCreateUserModal();
  //   }
  // };


  return (
    <>
      <div className="px-6 py-4">
        <h1 className="text-4xl my-7 font-bold">
          <span className="text-primary-800">User Management</span>
        </h1>
        <div className="mt-8 flow-root">
          <div className="flex my-4 justify-end">
        
            <AddUser  />
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
                            {request.email}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                            {request.accountNumber}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                            {request.walletBalance}
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
                                Active
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute w-full">
                      <div className="text-center">
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
                      <Button className="my-10">Create New User</Button>
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
