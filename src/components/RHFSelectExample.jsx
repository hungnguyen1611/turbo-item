import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function RHFInputSelectExample() {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      name: "",
      age: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Dữ liệu form:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input thường */}
      <TextField label="Tên" fullWidth {...register("name")} sx={{ mb: 2 }} />

      {/* Select */}
      <FormControl fullWidth>
        <InputLabel id="age-label">Chọn tuổi</InputLabel>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Select
              labelId="age-label"
              id="age-select"
              {...field}
              label="Chọn tuổi"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Gửi
      </Button>
    </form>
  );
}
