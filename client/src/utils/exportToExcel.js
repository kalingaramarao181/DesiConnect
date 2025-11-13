// utils/exportToExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, headers, rowMapper, fileName = "Report") => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid input to exportToExcel");
    alert("No data to export!");
    return;
  }

  const rows = [headers, ...data.map(rowMapper)];
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = headers.map((_, i) => ({
    wch: Math.max(...rows.map((row) => (row[i]?.f || row[i] || "").toString().length)) + 2
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  saveAs(blob, `${fileName}.xlsx`);
};
