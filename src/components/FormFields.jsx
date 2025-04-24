"use client";

import { useField } from "formik";
import usePasswordToggle from "../hooks/PasswordToggle";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input-wrap">
      <label className="text-gray-600 text-sm mt-1" htmlFor={props.name}>
        {label}
      </label>
      <input
        className="text-input block w-full border border-gray-400 h-10 rounded-lg px-3"
        {...field}
        {...props}
        type={props.type}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};
export const TextAmountInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input-wrap">
      <label className="text-gray-600 text-sm mt-1" htmlFor={props.name}>
        {label}
      </label>
      <div
        className={`flex items-center bg-white border border-gray-400 rounded-md h-10 overflow-hidden`}
      >
        <p className="border-r border-gray-300 px-2 text-gray-500">NGN</p>
        <input
          className="text-input block w-full h-10 px-3"
          {...field}
          {...props}
          type={props.type}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TextLabelInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input-wrap">
      <label
        className="text-gray-800 font-semibold text-sm mt-1"
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        className="text-input block w-full border border-gray-400 h-10 rounded-lg px-3"
        {...field}
        {...props}
        type={props.type}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input-wrap">
      <label
        className="text-gray-800 font-semibold text-sm mt-1"
        htmlFor={props.name}
      >
        {label}
      </label>
      <textarea
        className="text-input block w-full border border-gray-400 h-28 pt-3 rounded-lg px-3"
        {...field}
        {...props}
        type={props.type}
      ></textarea>
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const SelectInput = ({ label, data, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input-wrap">
      {label !== "" && (
        <label
          className="text-gray-800 font-semibold text-sm mt-1"
          htmlFor={props.name}
        >
          {label}
        </label>
      )}
      <select
        className="text-input block w-full border border-gray-400 h-10 rounded-lg px-3"
        {...field}
        {...props}
      >
        <option value={""}>Select</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [passwordInputType, passwordIcon] = usePasswordToggle();
  return (
    <div className="input-wrap">
      <label className="text-gray-800 text-sm mt-1" htmlFor={props.name}>
        {label}
      </label>
      <div className="border border-gray-400 rounded-lg relative w-full flex items-center">
        <input
          className="password_input block w-full h-10 rounded-lg px-3"
          {...field}
          {...props}
          type={passwordInputType === "password" ? "password" : "text"}
        />
        <div className="absolute right-3">
        {passwordIcon}</div>
      </div>
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input my-2 flex items-start">
        <input className="block mt-1 mr-1 border" {...field} {...props} />
        <p className="text-sm text-gray-700">{children}</p>
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function MultiSelect({ data, label, change, value }) {
  return (
    <div>
      <label className="text-gray-800 font-semibold text-sm mt-1">
        {label}
      </label>
      <Select
        onChange={change}
        value={value}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={data}
        // classNames={(valueContainer) => {{inputClassNames: }}}
        classNames={{
          container: () =>
            "select_input block w-full border border-gray-400 rounded-lg",
          control: (state) =>
            state.isFocused ? "outline-none select_control" : "select_control",
          multiValue: () => "purple_tag",
        }}
      />
    </div>
  );
}

export function SingleSelect({ data, label, change, value }) {
  return (
    <div>
      <label className="text-gray-800 font-semibold text-sm mt-1">
        {label}
      </label>
      <Select
        onChange={change}
        value={value}
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={data}
        // classNames={(valueContainer) => {{inputClassNames: }}}
        classNames={{
          container: () =>
            "select_input block w-full border border-gray-300 rounded-lg",
          control: (state) =>
            state.isFocused ? "outline-none select_control" : "select_control",
          multiValue: () => "purple_tag",
        }}
      />
    </div>
  );
}
