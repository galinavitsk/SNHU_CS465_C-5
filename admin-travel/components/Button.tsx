"use client";

import { memo } from "react";
interface Props {
  onClick?: () => void;
  disabled?: boolean;
  classNames?: {
    wrapper?: string;
    label?: string;
    hover?: string;
  };
  label: React.ReactNode;
  type?: "primary" | "secondary" | "disabled" | "text" | "active";
  size?: string;
  ignoreMinHeight?: boolean;
  typeButton?: "button" | "reset" | "submit";
  icon?: {image:JSX.Element, color?:string}
}

/**
 * A button component that can be used to create buttons with different styles and types.
 *
 * @param {Object} props - The props object.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled or not.
 * @param {"primary"|"secondary"|"disabled"|"text"|"active"} [props.type="primary"] - The type of button.
 * @param {Object} [props.classNames] - An object containing custom class names for the button.
 * @param {Function} [props.onClick] - The function to call when the button is clicked.
 * @param {React.ReactNode} props.label - The label to display on the button.
 * @param {string} [props.size] - The size of the button.
 * @param {boolean} [props.ignoreMinHeight=false] - Whether to ignore the minimum height of the button.
 * @param {"button"|"reset"|"submit"} [props.typeButton="button"] - The type of button.
 * @param {{image:JSX.Element, color?:string}} [props.icon] - The icon to display on the button.
 * @returns {JSX.Element} The button component.
 */
const Button = ({
  disabled = false,
  type = "primary",
  classNames,
  onClick,
  label,
  size,
  ignoreMinHeight = false,
  typeButton = "button",
  icon
}: Props) => {
  let hoverClass = "";
  switch (type) {
  case "primary":{
    hoverClass = `${disabled ? "!opacity-[0.3]" : "hover:bg-orange-300"}`;
    break;
  }
  case "secondary":
    hoverClass = `${disabled ? "!opacity-[0.3]" : "hover:bg-orange-300"}`;
    break;
  case "active":
    hoverClass = `!opacity-100`;
    break;
  default:
    hoverClass = `${disabled ? "!opacity-[0.3]" : ""}`;
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={typeButton}
      className={`rounded-lg center relative
        ${type=="primary" ? 'bg-blue-600 text-white' : ""}
        p-2
        ${classNames?.hover ? ` ${classNames.hover}` : hoverClass}
        ${type !== "text" && !ignoreMinHeight && "min-h-48"}
        ${size??""}
        ${disabled ? " btn-disabled" : ""}
        ${classNames?.wrapper ??""}
        flex flex-row items-center justify-center gap-2`}
    >
      {icon && <div className={icon.color}> {icon.image}</div>}
      <p className={classNames?.label ? ` ${classNames.label}` : ""}>{label}</p>
    </button>
  );
};

export default memo(Button);
