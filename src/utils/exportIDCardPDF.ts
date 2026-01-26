import jsPDF from "jspdf";
import QRCode from "qrcode";

interface UserData {
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  photo?: string;
  photoBase64?: string;
  userId?: string; // Helpful for unique QR data
}

export const exportIDCardPDF = async (user: UserData, eventName: string) => {
  // 1. Safety Check: Ensure Event Name exists
  const safeEventName = eventName || "EVENT NAME";

  // 2. Generate QR Code Data (JSON string of user info)
  const qrData = JSON.stringify({
    id: user.userId || user.email,
    name: user.fullName,
    role: user.designation
  });

  let qrCodeUrl = "";
  try {
    qrCodeUrl = await QRCode.toDataURL(qrData, { width: 100, margin: 1 });
  } catch (err) {
    console.error("QR Generation failed", err);
  }

  // 3. Initialize PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // --- DIMENSIONS & GRID SYSTEM ---
  const pageWidth = doc.internal.pageSize.getWidth();
  const cardWidth = 90;   // Slightly narrower for better proportion
  const cardHeight = 140; // Standard badge height
  const startX = (pageWidth - cardWidth) / 2;
  const startY = 30;
  
  const centerX = startX + (cardWidth / 2); // The anchor point for all centered text

  // --- BRANDING COLORS ---
  const primaryHex = "#4F46E5"; // Indigo
  const darkHex = "#1E293B";    // Slate 800
  const grayHex = "#94A3B8";    // Slate 400

  // ---------------- LAYER 1: CARD BASE ---------------- 
  
  // Shadow
  doc.setFillColor(220, 220, 220);
  doc.roundedRect(startX + 2, startY + 2, cardWidth, cardHeight, 4, 4, "F");

  // Main Card
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.1);
  doc.roundedRect(startX, startY, cardWidth, cardHeight, 4, 4, "FD");

  // ---------------- LAYER 2: HEADER ---------------- 

  // Header Color Block
  doc.setFillColor(primaryHex);
  doc.rect(startX, startY, cardWidth, 35, "F");

  // Lanyard Hole
  doc.setFillColor(255, 255, 255);
  doc.circle(centerX, startY + 6, 3, "F");

  // Event Name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(safeEventName.toUpperCase(), centerX, startY + 20, {
    align: "center",
    maxWidth: cardWidth - 10
  });

  // Badge Type Label
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("OFFICIAL DELEGATE", centerX, startY + 30, { align: "center" });

  // ---------------- LAYER 3: PHOTO ---------------- 

  const photoSize = 35;
  const photoY = startY + 35 - (photoSize / 2); // Overlaps header by 50%
  const photoX = centerX - (photoSize / 2);

  // White border around photo
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(photoX - 1.5, photoY - 1.5, photoSize + 3, photoSize + 3, 2, 2, "F");

  // User Image
  const userImage = user.photoBase64 || user.photo;
  if (userImage) {
    try {
      doc.addImage(userImage, "JPEG", photoX, photoY, photoSize, photoSize);
    } catch {
      // Fallback
      doc.setFillColor(240, 240, 240);
      doc.rect(photoX, photoY, photoSize, photoSize, "F");
    }
  } else {
    // Placeholder
    doc.setFillColor(240, 240, 240);
    doc.rect(photoX, photoY, photoSize, photoSize, "F");
    doc.setFontSize(30);
    doc.setTextColor(200, 200, 200);
    doc.text("?", centerX, photoY + 25, { align: "center" });
  }

  // ---------------- LAYER 4: TEXT INFO ---------------- 

  const textStartY = photoY + photoSize + 10;

  // Full Name
  doc.setTextColor(darkHex);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(user.fullName || "Guest", centerX, textStartY, { 
    align: "center",
    maxWidth: cardWidth - 10 
  });

  // Designation
  doc.setTextColor(primaryHex);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  const role = user.designation ? user.designation.toUpperCase() : "ATTENDEE";
  doc.text(role, centerX, textStartY + 6, { align: "center" });

  // Divider
  doc.setDrawColor(230, 230, 230);
  doc.line(centerX - 20, textStartY + 12, centerX + 20, textStartY + 12);

  // ---------------- LAYER 5: DETAILS GRID ---------------- 
  // We use distinct columns for perfect alignment
  
  const detailY = textStartY + 20;
  const labelX = startX + 15; // Labels start here
  const valueX = startX + 35; // Values start here (aligning them vertically)
  const rowHeight = 6;

  doc.setFontSize(8);

  // Row 1
  doc.setFont("helvetica", "normal");
  doc.setTextColor(grayHex);
  doc.text("EMAIL", labelX, detailY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkHex);
  doc.text(user.email || "-", valueX, detailY);

  // Row 2
  doc.setFont("helvetica", "normal");
  doc.setTextColor(grayHex);
  doc.text("PHONE", labelX, detailY + rowHeight);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkHex);
  doc.text(user.mobile || "-", valueX, detailY + rowHeight);

  // Row 3
  doc.setFont("helvetica", "normal");
  doc.setTextColor(grayHex);
  doc.text("ID REF", labelX, detailY + (rowHeight * 2));
  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkHex);
  doc.text(`#${user.userId?.substring(0,6) || "0000"}`, valueX, detailY + (rowHeight * 2));

  // ---------------- LAYER 6: FOOTER & QR ---------------- 

  const footerH = 25;
  const footerY = startY + cardHeight - footerH;

  // Background for Footer
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(startX, footerY, cardWidth, footerH, 4, 4, "F");
  // Fix rounded corners at bottom by redrawing top half strictly square if needed, 
  // or just draw a rect over the top half of the rounded footer to blend it
  doc.rect(startX, footerY, cardWidth, 5, "F"); 

  // QR Code Image
  if (qrCodeUrl) {
    const qrSize = 18;
    const qrX = startX + cardWidth - qrSize - 10;
    const qrY = footerY + (footerH - qrSize) / 2;
    doc.addImage(qrCodeUrl, "PNG", qrX, qrY, qrSize, qrSize);
  }

  // Footer Text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(darkHex);
  doc.text("SCAN FOR ACCESS", startX + 15, footerY + 10);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(grayHex);
  doc.text("Please show this code at the entrance.", startX + 15, footerY + 15);

  // Save PDF
  const filename = user.fullName ? `${user.fullName.replace(/\s+/g, "_")}_Badge.pdf` : "Badge.pdf";
  doc.save(filename);
};