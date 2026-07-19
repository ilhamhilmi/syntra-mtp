import type { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

interface SwitchToggleProps {
  checked: boolean;
  onChange: SwitchProps["onChange"];
}

const ClaySwitch = styled(Switch)(({ theme }) => ({
  width: 52,
  height: 28,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 3,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#2DD4BF",
        opacity: 1,
        border: 0,
        boxShadow:
          "inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.3)",
      },
      "& .MuiSwitch-thumb": {
        boxShadow:
          "2px 2px 4px rgba(0,0,0,0.15), -1px -1px 3px rgba(255,255,255,0.5)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    backgroundColor: "#F0EBE3",
    boxShadow:
      "2px 2px 4px rgba(0,0,0,0.15), -1px -1px 3px rgba(255,255,255,0.5)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 14,
    backgroundColor: "#D4C9BC",
    opacity: 1,
    boxShadow:
      "inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.3)",
  },
}));

export default function SwitchToggle({
  checked,
  onChange,
}: SwitchToggleProps) {
  return (
    <ClaySwitch
      checked={checked}
      onChange={onChange}
    />
  );
}