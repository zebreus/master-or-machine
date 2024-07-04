import classNames from "../../node_modules/classnames/index"

interface ButtonProps {
  buttonText: string
  color?: string
  size?: string
  clicked?: () => void
  disabled?: boolean | undefined
  className?: string
}

export const Button = ({
  buttonText,
  color = "green",
  size = "regular",
  clicked,
  disabled,
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={() => {
        clicked ? clicked() : {}
      }}
      disabled={disabled}
      type="button"
      className={classNames(
        "flex justify-center items-center rounded-xl h-fit py-2 px-4 text-white disabled:bg-slate-700 disabled:text-slate-400 ",
        className,
        {
          "bg-accentGreen": color === "green",
          "bg-darkBg": color === "dark",
          "text-xl": size === "big",
        },
      )}
    >
      {buttonText}
    </button>
  )
}
