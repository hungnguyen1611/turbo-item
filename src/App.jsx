import { Box, Stack } from "@mui/material";
import DataTable from "./components/DataTable";
import Dexed from "./components/Dexed";

export default function App() {
  return (
    <Stack spacing={4} sx={{}}>
      <DataTable />
      <Dexed />
    </Stack>
  );
}
