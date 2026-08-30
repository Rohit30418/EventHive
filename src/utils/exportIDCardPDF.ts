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
  userId?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);

  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255,
  ];
};

const getImageType = (image: string) => {
  if (image.startsWith("data:image/png")) return "PNG";
  if (image.startsWith("data:image/webp")) return "WEBP";
  return "JPEG";
};

const shortText = (value: string, limit: number) => {
  if (!value) return "-";
  return value.length > limit ? `${value.slice(0, limit)}...` : value;
};

export const exportIDCardPDF = async (user: UserData, eventName: string) => {
  const safeEventName = eventName || "EVENT NAME";

  const qrData = JSON.stringify({
    id: user.userId || user.email,
    name: user.fullName,
    role: user.designation,
    email: user.email,
    mobile: user.mobile,
  });

  let qrCodeUrl = "";

  try {
    qrCodeUrl = await QRCode.toDataURL(qrData, {
      width: 220,
      margin: 1,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
    });
  } catch (err) {
    console.error("QR Generation failed", err);
  }

  // Badge size only, no A4
  const cardWidth = 86;
  const cardHeight = 135;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [cardWidth, cardHeight],
    compress: true,
  });

  const startX = 0;
  const startY = 0;
  const centerX = cardWidth / 2;

  const primaryHex = "#4F46E5";
  const secondaryHex = "#06B6D4";
  const darkHex = "#0F172A";
  const mutedHex = "#64748B";
  const lightHex = "#F8FAFC";
  const borderHex = "#E2E8F0";

  const primary = hexToRgb(primaryHex);
  const secondary = hexToRgb(secondaryHex);
  const dark = hexToRgb(darkHex);
  const muted = hexToRgb(mutedHex);
  const light = hexToRgb(lightHex);
  const border = hexToRgb(borderHex);

  // Background
  doc.setFillColor(light[0], light[1], light[2]);
  doc.rect(0, 0, cardWidth, cardHeight, "F");

  // Card base
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.setLineWidth(0.25);
  doc.roundedRect(startX + 2, startY + 2, cardWidth - 4, cardHeight - 4, 5, 5, "FD");

  // Premium header
  doc.setFillColor(primary[0], primary[1], primary[2]);
  doc.roundedRect(startX + 2, startY + 2, cardWidth - 4, 34, 5, 5, "F");

  // Header bottom square fix
  doc.rect(startX + 2, startY + 28, cardWidth - 4, 8, "F");

  // Decorative circles
  doc.setFillColor(secondary[0], secondary[1], secondary[2]);
  doc.circle(cardWidth - 12, 10, 13, "F");

  doc.setFillColor(124, 58, 237);
  doc.circle(8, 31, 12, "F");

  // Inner header overlay
  doc.setFillColor(255, 255, 255);
  
  type GStateValue = Parameters<typeof doc.setGState>[0];
  type GStateConstructor = new (options: { opacity: number }) => GStateValue;
  const GState = (doc as unknown as { GState: GStateConstructor }).GState;

  doc.setGState(new GState({ opacity: 0.12 }));
  doc.roundedRect(8, 8, cardWidth - 16, 20, 4, 4, "F");
  doc.setGState(new GState({ opacity: 1 }));

  // Lanyard hole
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(centerX - 7, 5, 14, 4, 2, 2, "F");

  doc.setFillColor(primary[0], primary[1], primary[2]);
  doc.roundedRect(centerX - 4.8, 6, 9.6, 2, 1, 1, "F");

  // Event name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  const eventLines = doc.splitTextToSize(safeEventName.toUpperCase(), cardWidth - 18);
  doc.text(eventLines.slice(0, 2), centerX, 19, {
    align: "center",
    maxWidth: cardWidth - 18,
  });

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.text("OFFICIAL EVENT PASS", centerX, 31, {
    align: "center",
  });

  // Photo
  const photoSize = 33;
  const photoX = centerX - photoSize / 2;
  const photoY = 39;

  // Photo shadow
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(photoX - 1.8, photoY - 1.2, photoSize + 3.6, photoSize + 3.6, 4, 4, "F");

  // Photo border
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(photoX - 1.5, photoY - 1.5, photoSize + 3, photoSize + 3, 4, 4, "F");

  const userImage = user.photoBase64 || user.photo;

  if (userImage) {
    try {
      doc.addImage(
        userImage,
        getImageType(userImage),
        photoX,
        photoY,
        photoSize,
        photoSize
      );
    } catch {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(photoX, photoY, photoSize, photoSize, 3, 3, "F");
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("?", centerX, photoY + 22, { align: "center" });
    }
  } else {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(photoX, photoY, photoSize, photoSize, 3, 3, "F");
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("?", centerX, photoY + 22, { align: "center" });
  }

  // Name
  const nameY = photoY + photoSize + 9;

  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);

  const nameLines = doc.splitTextToSize(user.fullName || "Guest", cardWidth - 14);
  doc.text(nameLines.slice(0, 2), centerX, nameY, {
    align: "center",
    maxWidth: cardWidth - 14,
  });

  // Designation pill
  const role = user.designation ? user.designation.toUpperCase() : "ATTENDEE";
  const roleText = shortText(role, 22);

  doc.setFillColor(238, 242, 255);
  doc.roundedRect(centerX - 25, nameY + 8, 50, 8, 4, 4, "F");

  doc.setTextColor(primary[0], primary[1], primary[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(roleText, centerX, nameY + 13.2, {
    align: "center",
  });

  // Details box
  const detailBoxX = 9;
  const detailBoxY = nameY + 22;
  const detailBoxW = cardWidth - 18;
  const detailBoxH = 26;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.roundedRect(detailBoxX, detailBoxY, detailBoxW, detailBoxH, 4, 4, "FD");

  const labelX = detailBoxX + 5;
  const valueX = detailBoxX + 25;
  const row1Y = detailBoxY + 8;
  const rowGap = 8;

  const addDetailRow = (label: string, value: string, y: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(148, 163, 184);
    doc.text(label, labelX, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.4);
    doc.setTextColor(dark[0], dark[1], dark[2]);

    const lines = doc.splitTextToSize(value || "-", detailBoxW - 31);
    doc.text(lines.slice(0, 1), valueX, y);
  };

  addDetailRow("EMAIL", shortText(user.email || "-", 30), row1Y);
  addDetailRow("PHONE", user.mobile || "-", row1Y + rowGap);
  addDetailRow("ID REF", `#${user.userId?.substring(0, 8) || "000000"}`, row1Y + rowGap * 2);

  // Footer / QR area
  const footerY = cardHeight - 28;

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(2, footerY, cardWidth - 4, 26, 5, 5, "F");

  // top square fix
  doc.rect(2, footerY, cardWidth - 4, 6, "F");

  // QR white card
  const qrSize = 19;
  const qrX = cardWidth - qrSize - 9;
  const qrY = footerY + 4;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX - 1.5, qrY - 1.5, qrSize + 3, qrSize + 3, 3, 3, "F");

  if (qrCodeUrl) {
    doc.addImage(qrCodeUrl, "PNG", qrX, qrY, qrSize, qrSize);
  }

  // Footer text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("SCAN FOR ACCESS", 9, footerY + 10);

  doc.setTextColor(203, 213, 225);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.7);
  doc.text("Show this badge at the event entry gate.", 9, footerY + 15);

  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.4);
  doc.text("Powered by EventHive", 9, footerY + 21);

  const filename = user.fullName
    ? `${user.fullName.replace(/\s+/g, "_")}_Badge.pdf`
    : "Event_Badge.pdf";

  doc.save(filename);
};