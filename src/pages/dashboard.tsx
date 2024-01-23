import { useSelector } from "react-redux";

import { moneySaved2 as moneybag } from "../assets/images";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/Button";
import { emptyState as empty } from "../assets/images";
import { User } from "../model/user.model";
import FundWallet from "../components/Modal/fundWallet";
import TransferFund from "../components/Modal/transferFund";
import AddUser from "../components/Modal/addUser";
import { toast } from "react-toastify";
import { useState } from "react";

const Dashboard = () => {
  const users = useSelector((state: any) => state.users);
  const loggedInUser: User = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  )?.loggedInUser;

  const user = users.find((user: any) => user.id === loggedInUser?.id);
 
  const transactions =user?.transactionHistory || [];
  const formatAmount = (amount: number) => {
    if (!amount) return "0.00";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
  };
const copyToClipboard = (e:any, data:any) => {
    e.preventDefault();
    navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
}

// create a dashboard time component that shows the date and current time with seconds
const DashboardTime = () => {

  const [date, setDate] = useState(new Date());

  setInterval(() => {
    setDate(new Date());
  }, 1000);

  return (
    <div className="text-secondary-400 font-bold">
      {date.toLocaleDateString()} - {date.toLocaleTimeString()}
    </div>
  )

}



  return (
    <div className="px-6 py-4">
      <div className="flex justify-between">
      <h1 className="text-4xl mb-7 font-bold">
        Welcome Back,{" "}
        <span className="text-primary-800">{loggedInUser.name}</span>
      </h1>
      <div className="ml-auto space-x-2 flex items-center">
        <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        <span className="text-gray-400"><DashboardTime/></span>
      </div>

      </div>

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <div className="p-6 bg-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <img src={moneybag} alt="LoginImage" width={50} height={50} />
            <div className="text-[#101828] font-medium text-base">
              Current Balance
            </div>
          </div>
          <div className="w-full text-2xl font-bold my-4">
            ₦{formatAmount(user?.walletBalance ?? 0) ?? formatAmount(loggedInUser.walletBalance ?? 0)}
          </div>
          <div className="flex gap-4">
            <FundWallet />
            <TransferFund />
          </div>
        </div>
        {loggedInUser.role === "Admin" ? (
          <>
            <div className="p-6 bg-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img src={moneybag} alt="LoginImage" width={50} height={50} />
                <div className="text-[#101828] font-medium text-base">
                  Users
                </div>
              </div>
              <div className="w-full text-2xl font-bold my-4">
                {users.length}
              </div>
              <div className="flex justify-start">
                <div className="">
                  <AddUser />
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="py-6 bg-secondary-600 text-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <span className="px-6 mb-3 text-sm font-bold ">Acount Number</span>
          <div className="flex justify-between items-center text-secondary-600 px-6 my-2 bg-white gap-5">
            <div className="">
              <div className="w-full text-4xl tracking-normal  font-bold my-1">
                {loggedInUser.accountNumber ?? "..."}
              </div>
            </div>

            <ClipboardDocumentIcon 
            onClick={(e) => copyToClipboard(e, loggedInUser.accountNumber)} 
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          </div>
          <span className="px-6 text-xs italic font-bold ">
            {loggedInUser.name?.toUpperCase() ?? "..."}
          </span>
        </div>
      </div>

      <h1 className="text-4xl my-7 font-bold">
        <span className="text-primary-800">Transaction History</span>
      </h1>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 min-h-[30vh]">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full bg-white shadow   divide-y divide-B3261E">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-xs font-bold text-surfaceVariant-neutral30 "
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                  >
                    Amount(₦)
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                  >
                    Description
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-bold text-surfaceVariant-neutral30"
                  >
                    Sender
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-Z79747E1A relative">
                {transactions?.length > 0 ? (
                  <>
                    {transactions?.map((request: any, idx: number) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                          {request.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                          {request.date}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                          {formatAmount(request.amount)}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-surfaceVariant-neutral30 ">
                          {request?.type?.toLowerCase() === "credit" ? (
                            <div className="text-green-600 font-semibold">
                              Credit
                            </div>
                          ) : (
                            <div className="text-red-600 font-semibold">
                              Debit
                            </div>
                          )}
                        </td>
                        <td className="whitespace-wrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                          {request.description}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-xs text-surfaceVariant-neutral30">
                          {request.sender}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center absolute w-full">
                    <div className="text-center"   style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                      <img
                        src={empty}
                        alt="empty table"
                        className="my-5"
                        width={100}
                        height={100}
                      />
                      <p className="text-Z667085">
                        There are currently no transactions
                      </p>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loggedInUser.role === "Admin" ? (
        <>
          <h1 className="text-4xl my-7 font-bold">
            <span className="text-primary-800">Users</span>
          </h1>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
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
                                  Inactive
                                </div>
                              )}
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
                        <AddUser />
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
