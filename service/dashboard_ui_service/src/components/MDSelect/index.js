import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import PropsType from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, value, theme) {
  if (!value)
    return {
      fontWeight: theme.typography.fontWeightRegular,
    };
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  label,
  keylabel,
  keyValue,
  data,
  handleChange,
  valueSelected,
  name,
  ...props
}) {
  const theme = useTheme();

  return (
    <FormControl {...props}>
      <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        name={name}
        value={valueSelected}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {data
              .filter((item) => selected.includes(item[keyValue]))
              .map((item) => {
                return <Chip key={item[keyValue]} label={item[keylabel]} />;
              })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {data.map((v) => (
          <MenuItem key={v.id} value={v.id} style={getStyles(v[keylabel], valueSelected, theme)}>
            {v[keylabel]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

MultipleSelectChip.propTypes = {
  data: PropsType.array,
  handleChange: PropsType.func,
  valueSelected: PropsType.array,
  label: PropsType.string,
  keylabel: PropsType.string,
  name: PropsType.string,
  keyValue: PropsType.any,
};
