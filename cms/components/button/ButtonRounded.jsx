import React from "react";

const ButtonCircularIcon = React.forwardRef((props, ref) => {
  const {
    icon,
    onClick,
    label = "",
    className = "",
    color = "",
    variant = "default",
    type = "button",
    textColor = "white",
    border = false,
    borderClasses = border ? "border-2" : "border-0",
    borderColor = "transparent",
  } = props;
  return (
    <button
      className={`flex items-center ${borderClasses} border-${borderColor} rounded-full font-semibold text-xs text-${textColor} gap-0.5 px-2 py-0.5 ${className} bg-${color}`}
      onClick={onClick}
      variant={variant}
      type={type}
    >
      {icon} {label}
    </button>
  );
});

export default ButtonCircularIcon;
