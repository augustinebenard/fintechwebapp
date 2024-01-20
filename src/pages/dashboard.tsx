import { useSelector } from "react-redux";

import { moneySaved2 as moneybag } from "../assets/images";
import {
  ArchiveBoxArrowDownIcon,
  ChevronDoubleRightIcon,
  ClipboardDocumentCheckIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/Button";
import { emptyState as empty } from "../assets/images";

const Dashboard = () => {
  const users = useSelector((state: any) => state.users);

  // useEffect(() => {

  //   // if (loanApplicationError) {
  //   //   toast.error(loanApplicationError.message);
  //   // }
  //   // if (totalLoanApplicationError) {
  //   //   toast.error(totalLoanApplicationError.message);
  //   // }
  // }, [pageNumber]);

  return (
    <div className="px-6 py-4">
      <h1 className="text-4xl mb-7 font-bold">
        Welcome Back,{" "}
        <span className="text-primary-800">{"Augustine Benard"}</span>
      </h1>

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <div className="p-6 bg-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <img src={moneybag} alt="LoginImage" width={50} height={50} />
            <div className="text-[#101828] font-medium text-base">
              Current Balance
            </div>
          </div>
          <div className="w-full text-2xl font-bold my-4">₦9000.00</div>
          <div className="flex gap-4">
            <button className="sm:mt-0 flex gap-2 items-center rounded bg-FFE6E6 py-2 px-2 w-[132px]">
              <ArchiveBoxArrowDownIcon
                className="h-5 w-5 text-secondary-500"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-secondary-500">
                Fund Wallet
              </span>
            </button>
            <button className="sm:mt-0 flex gap-2 items-center rounded bg-secondary-500 py-2 px-6 w-[132px]">
              <span className="text-sm font-medium text-white">Tranfer</span>
              <ChevronDoubleRightIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="p-6 bg-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <img src={moneybag} alt="LoginImage" width={50} height={50} />
            <div className="text-[#101828] font-medium text-base">Users</div>
          </div>
          <div className="w-full text-2xl font-bold my-4">{users.length}</div>
          <div className="flex justify-start">
            <div className="">
              <button className="sm:mt-0 flex gap-2 items-center rounded bg-FFE6E6 py-2 px-2 w-[132px]">
                <UserPlusIcon
                  className="h-5 w-5 text-secondary-500"
                  aria-hidden="true"
                />
                <span className="text-sm text-secondary-500">Add User</span>
              </button>
            </div>
          </div>
        </div>

        <div className="py-6 bg-secondary-600 text-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <span className="px-6 mb-3 text-sm font-bold ">Acount Number</span>
          <div className="flex justify-between items-center text-secondary-600 px-6 my-2 bg-white gap-5">
            <div className="">
              <div className="w-full text-4xl tracking-normal  font-bold my-1">
                {"00321234212"}
              </div>
            </div>

            <ClipboardDocumentCheckIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </div>
          <span className="px-6 text-xs italic font-bold ">
            Benard Augustine Adakole
          </span>
        </div>
      </div>

      <h1 className="text-4xl my-7 font-bold">
        <span className="text-primary-800">Transaction History</span>
      </h1>

      <h1 className="text-4xl my-7 font-bold">
        <span className="text-primary-800">Users</span>
      </h1>
      <div className="mt-8 flow-root">
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

      {/* <Pagination total={users?.length} setPageNumber={setPageNumber} /> */}
    </div>
  );
};

export default Dashboard;
