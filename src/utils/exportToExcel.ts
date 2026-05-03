import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface UserData {
  fullName: string;
  email: string;
  mobile?: string;
  designation?: string;
  gender?: string;
  userId: string;
  [key: string]: any;
}

export const exportToExcel = (data: UserData[], eventName: string) => {

  const sanitizedData = data.map((user) => ({
    "Full Name": user.fullName || "N/A",
    "Email": user.email || "N/A",
    "Mobile": user.mobile || "-",
    "Designation": user.designation || "Participant",
    "Gender": user.gender || "-",
    "User ID": user.userId,
  }));

  // 2. CREATE WORKSHEET
  const worksheet = XLSX.utils.json_to_sheet(sanitizedData);
  
  // 3. AUTO-ADJUST COLUMN WIDTH
  // This makes the file look professional immediately upon opening.
  const wscols = [
    { wch: 20 }, // Full Name
    { wch: 30 }, // Email (needs more space)
    { wch: 15 }, // Mobile
    { wch: 20 }, // Designation
    { wch: 10 }, // Gender
    { wch: 25 }, // User ID
  ];
  worksheet["!cols"] = wscols;

  // 4. CREATE WORKBOOK
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

  // 5. WRITE FILE
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  // 6. DOWNLOAD
  const fileName = `${eventName.replace(/\s+/g, '_')}_Registrations.xlsx`;
  saveAs(fileBlob, fileName);
};