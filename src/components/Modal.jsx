import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Modal({ maxW, children, overflow }) {
  return (
    <div className="modal_wrap fixed top-0 left-0 w-full h-screen bg-white md:bg-black/20 modal overflow-scroll z-10 py-10">
      <div className="w-full h-full flex md:py-10 md:px-5 justify-center items-center">
        <div
          className={`bg-white w-full relative ${
            maxW ? maxW : "max-w-md"
          } md:rounded-md border border-gray-300 ${overflow === "none" ? "" : "overflow-x-hidden"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function ModalHeader({ children }) {
  return (
    <div className="py-4 px-3 md:px-5 primary_bg text-white flex justify-between mb-5">
      {children}
    </div>
  );
}

export function ModalBody({ children }) {
  return <div className="pb-10 px-3 md:px-5">{children}</div>;
}

export function ModalHeaderTitle({ text }) {
  return (
    <h1 className="text-white capitalize font-semibold md:text-lg">
      {text}
    </h1>
  );
}

export function ModalHeaderLabel({ text }) {
  return (
    <p className="uppercase text-xs text-gray-200 font font-semibold">{text}</p>
  );
}

export function ModalHeaderIcon({closeModal}) {
  return (
    <div className="cursor-pointer" onClick={closeModal}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
  );
}
