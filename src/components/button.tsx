import classNames from "../../node_modules/classnames/index"

interface IProps {
  buttonText: string
  color?: string
}

export const Button = ({ buttonText, color = "green" }: IProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "flex justify-center items-center rounded-xl h-fit py-2 px-4 text-white",
        {
          "bg-accentGreen": color === "green",
          "bg-darkBg": color === "dark",
        },
      )}
    >
      {buttonText}
    </button>
  )
}
