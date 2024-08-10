"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Transactions({ userid }) {
  const getdata = useRef(false);
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    function gett() {
      if (getdata.current) return;
      getdata.current = true;
      fetch(`http://localhost:4000/transaction/${userid}`)
        .then((respone) => respone.json())
        .then((data) => {
          console.log(data);
          setTransaction(data);
        });
    }
    gett();
  }, [userid]);

  return (
    <div className="w-screen flex justify-center p-4 ">
    
    <div className=" stats shadow w-96 py-4 mx-auto flex flex-col">
      
      <h1 className="stat-value text-center pb-2">Transcations</h1>
      
     
    
      <ul className="timeline timeline-vertical">
        {transaction.map((element, key) => {
          if (key == 0 && element.receiver == -1) {
            return (
              <li>
                <div className="timeline-start timeline-box bg-red-100 w-32 text-center ">
                  ${element.amount}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-red-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end">{element.date.slice(0, 10)}</div>
                <hr className=" bg-gray-600" />
              </li>
            );
          } else if (key == 9 && element.receiver == -1) {
            return (
              <li>
                <hr className=" bg-gray-600" />
                <div className="timeline-start timeline-box bg-red-100 w-32 text-center">
                  ${element.amount}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-red-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end ">{element.date.slice(0, 10)}</div>
              </li>
            );
          } else if (key > 0 && key < 9 && element.receiver == -1) {
            return (
              <li>
                <hr className=" bg-gray-600" />
                <div className="timeline-start timeline-box bg-red-100 w-32 text-center">
                  ${element.amount}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-red-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end ">{element.date.slice(0, 10)}</div>
                <hr className=" bg-gray-600" />
              </li>
            );
          } else if (key > 0 && key < 9 && element.receiver == 1) {
            return (
              <li>
                <hr className=" bg-gray-600" />
                <div className="timeline-start">
                  {element.date.slice(0, 10)}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-green-100 w-32 text-center">
                  ${element.amount}
                </div>
                <hr className=" bg-gray-600" />
              </li>
            );
          } else if (key == 0 && element.receiver == 1) {
            return (
              <li>
                <div className="timeline-start ">
                  {element.date.slice(0, 10)}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-green-100 w-32 text-center">
                  ${element.amount}
                </div>
                <hr className=" bg-gray-600" />
              </li>
            );
          } else if (key == 9 && element.receiver == 1) {
            return (
              <li>
                <hr className=" bg-gray-600" />
                <div className="timeline-start ">
                  {element.date.slice(0, 10)}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-green-100 w-32 text-center">
                  ${element.amount}
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
    </div>
  );
}
