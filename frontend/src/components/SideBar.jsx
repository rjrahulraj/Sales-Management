import React, { useState } from "react";

export default function Sidebar({ userName = "Anurag Yadav", avatarUrl = null }) {
     const [openServices, setOpenServices] = useState(true);
     const [openInvoices, setOpenInvoices] = useState(true);

     return (
          <aside className="min-h-screen bg-gray-50 m-3">
               {/* Profile card */}
               <div>
                    <div className="bg-white rounded-lg p-3 flex gap-3 shadow-sm border">
                         <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white font-semibold">
                              {avatarUrl ? (
                                   <img
                                        src={avatarUrl}
                                        alt="avatar"
                                        className="w-full h-full object-cover rounded-md"
                                   />
                              ) : (
                                   <span>V</span>
                              )}
                         </div>

                         <div className="flex-1">
                              <div className="text-sm font-semibold">Vault</div>
                              <div className="text-xs text-gray-500">{userName}</div>
                         </div>

                         <div className="text-gray-400">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="h-4 w-4"
                                   viewBox="0 0 20 20"
                                   fill="currentColor"
                              >
                                   <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.656a.75.75 0 01-1.12 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                        clipRule="evenodd"
                                   />
                              </svg>
                         </div>
                    </div>
               </div>

               {/* Main links */}
               <nav className="text-sm mt-4 space-y-1">
                    <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full">
                         <svg
                              className="h-5 w-5 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                         >
                              <rect x="3" y="10" width="3" height="10" rx="1" />
                              <rect x="10" y="4" width="3" height="16" rx="1" />
                              <rect x="17" y="13" width="3" height="7" rx="1" />
                         </svg>
                         <span className="text-gray-700">Dashboard</span>
                    </button>

                    <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full">
                         <svg
                              className="h-5 w-5 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                         >
                              <circle cx="9" cy="7" r="4" />
                              <circle cx="17" cy="7" r="4" />
                              <path d="M3 21c0-4 3-7 6-7s6 3 6 7" />
                              <path d="M15 21c0-3.5 2-6 4-6s4 2.5 4 6" />
                         </svg>
                         <span className="text-gray-700">Nexus</span>
                    </button>

                    <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full">
                         <svg
                              className="h-5 w-5 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                         >
                              <circle cx="12" cy="12" r="10" />
                              <polygon points="10 8 16 12 10 16" />
                         </svg>
                         <span className="text-gray-700">Intake</span>
                    </button>
               </nav>

               {/* Spacer */}
               <div className="mt-5 space-y-4">
                    {/* Services card */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border">
                         <button
                              onClick={() => setOpenServices(!openServices)}
                              className="flex items-center justify-between w-full"
                              aria-expanded={openServices}
                         >
                              <div className="flex items-center gap-3">
                                   <svg
                                        className="h-5 w-5 text-gray-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                   >
                                        <path d="M6 2h9l5 5v15H6z" />
                                        <polyline points="14 2 14 8 20 8" />
                                   </svg>

                                   <span className="font-medium text-gray-700">Services</span>
                              </div>

                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className={`h-4 w-4 text-gray-400 transform ${openServices ? "rotate-180" : ""
                                        }`}
                                   viewBox="0 0 20 20"
                                   fill="currentColor"
                              >
                                   <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.656a.75.75 0 01-1.12 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                        clipRule="evenodd"
                                   />
                              </svg>
                         </button>

                         {openServices && (
                              <ul className="mt-3 space-y-2">
                                   <li className="flex items-center gap-3 text-gray-600 p-2 rounded hover:bg-gray-50">
                                        <svg
                                             className="h-5 w-5 text-gray-500"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        >
                                             <circle cx="12" cy="12" r="10" />
                                             <polygon points="10 8 16 12 10 16" />
                                        </svg>
                                        <span className="text-sm">Pre-active</span>
                                   </li>

                                   <li className="flex items-center gap-3 text-gray-600 p-2 rounded hover:bg-gray-50">
                                        <svg
                                             className="h-5 w-5 text-gray-600"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        >
                                             <path d="M2 3h7a3 3 0 0 1 3 3v15a2 2 0 0 0-2-2H2z" />
                                             <path d="M22 3h-7a3 3 0 0 0-3 3v15a2 2 0 0 1 2-2h8z" />
                                        </svg>
                                        <span className="text-sm">Active</span>
                                   </li>

                                   <li className="flex items-center gap-3 text-gray-600 p-2 rounded hover:bg-gray-50">
                                        <svg
                                             className="h-5 w-5 text-gray-600"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        >
                                             <circle cx="12" cy="12" r="10" />
                                             <line x1="15" y1="9" x2="9" y2="15" />
                                             <line x1="9" y1="9" x2="15" y2="15" />
                                        </svg>
                                        <span className="text-sm">Blocked</span>
                                   </li>

                                   <li className="flex items-center gap-3 text-gray-600 p-2 rounded hover:bg-gray-50">
                                        <svg
                                             className="h-5 w-5 text-gray-600"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        >
                                             <circle cx="12" cy="12" r="10" />
                                             <path d="M8 12l3 3 5-5" />
                                        </svg>
                                        <span className="text-sm">Closed</span>
                                   </li>
                              </ul>
                         )}
                    </div>

                    {/* Invoices card */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border">
                         <button
                              onClick={() => setOpenInvoices(!openInvoices)}
                              className="flex items-center justify-between w-full"
                              aria-expanded={openInvoices}
                         >
                              <div className="flex items-center gap-3">
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                   >
                                        <path d="M4 2h14l4 4v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                                        <line x1="8" y1="10" x2="16" y2="10" />
                                        <line x1="8" y1="14" x2="16" y2="14" />
                                        <line x1="8" y1="18" x2="12" y2="18" />
                                   </svg>
                                   <span className="font-medium text-gray-700">Invoices</span>
                              </div>

                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className={`h-4 w-4 text-gray-400 transform ${openInvoices ? "rotate-180" : ""
                                        }`}
                                   viewBox="0 0 20 20"
                                   fill="currentColor"
                              >
                                   <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.656a.75.75 0 01-1.12 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                        clipRule="evenodd"
                                   />
                              </svg>
                         </button>

                         {openInvoices && (
                              <ul className="mt-3 space-y-2">
                                   <li className="flex items-center gap-3 text-gray-700 p-2 rounded bg-gray-50 font-semibold">
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        >
                                             <path d="M6 2h10l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                                             <polyline points="14 2 14 8 20 8" />
                                             <line x1="8" y1="12" x2="16" y2="12" />
                                             <line x1="8" y1="16" x2="16" y2="16" />
                                             <line x1="8" y1="20" x2="12" y2="20" />
                                        </svg>
                                        <span className="text-sm">Proforma Invoices</span>
                                   </li>

                                   <li className="flex items-center gap-3 text-gray-600 p-2 rounded hover:bg-gray-50">
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             className="h-4 w-4 text-gray-400"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="1.5"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        >
                                             <path d="M12 8v8m4-4H8" />
                                        </svg>
                                        <span className="text-sm">Final Invoices</span>
                                   </li>
                              </ul>
                         )}
                    </div>
               </div>
          </aside>
     );
}
