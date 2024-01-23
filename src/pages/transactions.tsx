import React from "react";
import FundWallet from "../components/Modal/fundWallet";
import TransferFund from "../components/Modal/transferFund";
import { useSelector } from "react-redux";
import { User } from "../model/user.model";
import { emptyState as empty } from "../assets/images";

const Transactions = () => {
  const users = useSelector((state: any) => state.users);
  const loggedInUser: User = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  )?.loggedInUser;
  const user = users.find((user: any) => user.id === loggedInUser?.id);
  const transactions = [...user?.transactionHistory].reverse();
  
  const formatAmount = (amount: number) => {
    if (!amount) return "0.00";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
  };
  return (
    <>
      <div className="px-6 py-4">
        <h1 className="text-4xl my-4 font-bold">
          <span className="text-primary-800">Transactions</span>
        </h1>
        <div className="mt-4 flow-root">
          <div className="flex space-x-4 my-4 justify-end">
            <FundWallet /> <TransferFund />
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
      </div>
    </>
  );
};

export default Transactions;
