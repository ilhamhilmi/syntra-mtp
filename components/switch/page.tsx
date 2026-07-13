import Switch from "@mui/material/Switch";
import type { SwitchProps } from "@mui/material/Switch";

interface SwitchToggleProps {
  checked: boolean;
  onChange: SwitchProps["onChange"];
}

export default function SwitchToggle({
  checked,
  onChange,
}: SwitchToggleProps) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      color="primary"
    />
  );
}