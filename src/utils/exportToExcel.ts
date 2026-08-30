import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface UserData {
  fullName: string;
  email: string;
  mobile?: string;
  designation?: string;
  gender?: string;
  userId: string;
}

export const exportToExcel = (data: UserData[], eventName: string) => {
  const sanitizedData = data.map((user) => ({
    "Full Name": user.fullName || "N/A",
    Email: user.email || "N/A",
    Mobile: user.mobile || "-",
    Designation: user.designation || "Participant",
    Gender: user.gender || "-",
    "User ID": user.userId,
  }));

  const worksheet = XLSX.utils.json_to_sheet(sanitizedData);
  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 30 },
    { wch: 15 },
    { wch: 20 },
    { wch: 10 },
    { wch: 25 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  const fileName = `${eventName.replace(/\s+/g, "_")}_Registrations.xlsx`;
  saveAs(fileBlob, fileName);
};
