import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data: any[], eventName: string) => {
  // 1. SANITIZE DATA
  // We map over the data to create a new array without the massive Base64 strings.
  const sanitizedData = data.map((user) => ({
    "Full Name": user.fullName,
    "Email": user.email,
    "Mobile": user.mobile,
    "Designation": user.designation,
    "Gender": user.gender,
    "User ID": user.userId,
    // Explicitly exclude 'photo' or 'photoBase64' here.
    // If you have other long fields, you can check length:
    // "Description": user.desc.length > 30000 ? user.desc.substring(0, 30000) + "..." : user.desc
  }));

  // 2. CREATE WORKSHEET
  const worksheet = XLSX.utils.json_to_sheet(sanitizedData);
  const workbook = XLSX.utils.book_new();

  // 3. AUTO-ADJUST COLUMN WIDTH (Optional, but looks nicer)
  const maxWidth = 20;
  const wscols = [
    { wch: maxWidth }, // Name
    { wch: 25 },       // Email
    { wch: 15 },       // Mobile
    { wch: maxWidth }, // Designation
    { wch: 10 },       // Gender
    { wch: 20 },       // ID
  ];
  worksheet["!cols"] = wscols;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

  const fileName = `${eventName}_Registrations.xlsx`;
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, fileName);
};