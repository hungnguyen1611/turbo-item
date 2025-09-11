import { Article } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    valueGetter: (value, row) => `${row.id || ""}`,
  },
  {
    field: "type",
    headerName: "Loại",
    flex: 1,
    valueGetter: (value, row) => `${row.type || ""}`,
  },
  {
    field: "deviceName",
    headerName: "Tên thiet bi",
    flex: 2,
    sortable: false,
    filterable: false,
    hideable: false,

    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {params.row.deviceName}
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar sx={{ width: 24, height: 24 }} src={params.row.avatar} />
            <Article />
          </Box>
        </Box>
      );
    },
  },

  {
    field: "deviceCode",
    headerName: "Má thiet bi",
    type: "number",
    flex: 1,
    valueGetter: (value, row) => `${row.deviceCode || ""}`,
  },
  {
    field: "status",
    headerName: "Trạng Thái",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.status || ""}`,
  },
  {
    field: "compensationMoney",
    headerName: "Tiền bồi thường",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.compensationMoney || ""}`,
  },
  {
    field: "location",
    headerName: "Ví trí",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.location || ""}`,
  },
  {
    field: "departments",
    headerName: "Phòng ban",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.departments || ""}`,
  },
  {
    field: "office",
    headerName: "Văn phòng",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 2,
    valueGetter: (value, row) => `${row.office || ""}`,
  },
];

const rows = [
  {
    id: 1,
    type: "Bàn phím",
    deviceName: "Chuột gaming",
    deviceCode: "DB-123",
    status: "Hệ thống",
    compensationMoney: "100.000",
    location: "Phòng B",
    departments: "Phòng B",
    office: 35,
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    id: 2,
    type: "Bàn phím",
    deviceName: "Chuột gaming",
    deviceCode: "DB-123",
    status: "Hệ thống",
    compensationMoney: "100.000",
    location: "Phòng B",
    departments: "Phòng B",
    office: 35,
  },
  {
    id: 3,
    type: "Bàn ph임",
    deviceName: "Chuột gaming",
    deviceCode: "DB-123",
    status: "Hệ thống",
    compensationMoney: "100.000",
    location: "Phòng B",
    departments: "Phòng B",
    office: 35,
  },
  {
    id: 4,
    type: "Bàn ph임",
    deviceName: "Chuót gaming",
    deviceCode: "DB-123",
    dtatus: "Hệ thống",
    compensationMoney: "100.000",
    location: "Phòng B",
    departments: "Phòng B",
    office: 35,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const step = 5;
const pageSizes = Array.from(
  { length: Math.ceil(rows.length / step) },
  (_, i) => (i + 1) * step
);

export default function DataTable() {
  const [selectedIds, setSelectedIds] = useState([]);
  const arr = Array.from(selectedIds?.ids || []);
  console.log("🚀 ~ DataTable ~ arr:", arr);

  return (
    <Paper sx={{ flex: 1, boxSizing: "border-box", width: "80%", mx: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "& .MuiDataGrid-columnHeaderTitleContainer, & .MuiDataGrid-cell": {
            justifyContent: "center",
            textAlign: "center",
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid rgba(224, 224, 224, 1)", // đường kẻ dọc
          },
          "& .MuiDataGrid-cell:last-child": {
            borderRight: "none", // bỏ border cột cuối
          },
        }}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizes}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          // newSelection là array id các dòng đang được chọn
          setSelectedIds(newSelection);
        }}
      />
    </Paper>
  );
}
