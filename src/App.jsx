import { Stack } from "@mui/material";
import DataTable from "./components/DataTable";
import Dexed from "./components/Dexed";
import SignaturePad from "./components/SignaturePad";
import CameraBox from "./components/CameraBox";

export default function App() {
  return (
    <Stack spacing={4} sx={{}}>
      <DataTable />
      <Dexed />
      <SignaturePad />
      <CameraBox />
    </Stack>
  );
}
