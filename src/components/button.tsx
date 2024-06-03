import classNames from "../../node_modules/classnames/index"

interface IProps {
  buttonText: string
  color?: string
  size?: string
  clicked?: () => void
}

export const Button = ({
  buttonText,
  color = "green",
  size = "regular",
  clicked,
}: IProps) => {
  return (
    <button
      onClick={() => {
        clicked ? clicked() : {}
      }}
      type="button"
      className={classNames(
        "flex justify-center items-center rounded-xl h-fit py-2 px-4 text-white",
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
