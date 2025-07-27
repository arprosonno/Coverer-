let pdfURL = "";

// Generate PDF with Enhanced Look
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4"); // A4 Page Size

    let instName1 = document.getElementById("instName1").value;
    let instName2 = document.getElementById("instName2").value;
    let assignmentTopic = document.getElementById("assignmentTopic").value;
    let studentName = document.getElementById("studentName").value;
    let studentID = document.getElementById("studentID").value;
    let studentDept = document.getElementById("studentDept").value;
    let teacherName = document.getElementById("teacherName").value;
    let teacherDesignation = document.getElementById("teacherDesignation").value;
    let teacherDept = document.getElementById("teacherDept").value;
    let submissionDate = document.getElementById("submissionDate").value;
    let logoInput = document.getElementById("instLogo").files[0];

    // Format the date to "13 Feb, 2025"
    let formattedDate = formatDate(submissionDate);

    if (logoInput) {
        let reader = new FileReader();
        reader.readAsDataURL(logoInput);
        reader.onload = function (event) {
            let logoData = event.target.result;
            finalizePDF(doc, instName1, instName2, assignmentTopic, studentName, studentID, studentDept, teacherName, teacherDesignation, teacherDept, formattedDate, logoData);
        };
    } else {
        finalizePDF(doc, instName1, instName2, assignmentTopic, studentName, studentID, studentDept, teacherName, teacherDesignation, teacherDept, formattedDate, null);
    }
}

// Format the date to "13 Feb, 2025"
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Finalize and Add Image to PDF
function finalizePDF(doc, instName1, instName2, topic, studentName, studentID, studentDept, teacherName, teacherDesignation, teacherDept, submissionDate, logoData) {
    // Outer Page Border
    doc.setDrawColor(0, 0, 255);
    doc.rect(10, 10, 190, 277);

    // Institution Name
    doc.setFontSize(18);
    doc.setTextColor(0, 128, 0);
    doc.text(instName1, 105, 30, { align: "center" });
    doc.text(instName2, 105, 40, { align: "center" });

    // Add Institution Logo (if available)
    if (logoData) {
        doc.addImage(logoData, "JPEG", 85, 50, 40, 40); // Position (85,50) with size (40x40)
    }

    // Decorative Separator
    doc.setDrawColor(0, 0, 0);
    doc.line(40, 100, 170, 100);

    // Assignment Topic
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("An Assignment on", 105, 110, { align: "center" });

    doc.setTextColor(0, 128, 0);
    doc.setFontSize(16);
    doc.text(topic, 105, 120, { align: "center" });

    // Decorative Separator Below
    doc.setDrawColor(0, 0, 0);
    doc.line(40, 130, 170, 130);

    // Adjusted "Submitted By" and "Submitted To" Boxes with a Clear Separation from Margin
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setDrawColor(0, 0, 255);

    // Increased separation from left margin (20mm -> 20mm) and right margin (190mm -> 180mm)
    doc.rect(20, 140, 170, 70); // Increased height for better content fit

    // Break long names into two lines
    let studentNameLines = splitText(studentName, 28); // 28mm space for the name
    let teacherNameLines = splitText(teacherName, 28); // 28mm space for the name

    doc.text("Submitted By:", 30, 150);
    doc.setFontSize(10); // Smaller font size for the table contents
    doc.text(`Name: ${studentNameLines[0]}`, 30, 160);
    if (studentNameLines[1]) doc.text(studentNameLines[1], 30, 165); // Second line if it exists
    doc.text(`ID: ${studentID}`, 30, 170);
    doc.text(`Department: ${studentDept}`, 30, 180);

    // Separate line
    doc.line(105, 140, 105, 210); // Adjusted line to fit new width

    doc.text("Submitted To:", 115, 150);
    doc.text(`Name: ${teacherNameLines[0]}`, 115, 160);
    if (teacherNameLines[1]) doc.text(teacherNameLines[1], 115, 165); // Second line if it exists
    doc.text(`Designation: ${teacherDesignation}`, 115, 170);
    doc.text(`Department: ${teacherDept}`, 115, 180);

    // Submission Date: now placed **outside** the table area
    doc.setFontSize(12);
    doc.text(`Submission Date: ${submissionDate}`, 105, 220, { align: "center" });

    // Decorative Bottom Border
    doc.setDrawColor(0, 0, 255);
    doc.line(30, 230, 180, 230);

    // Motivational Quote
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text('"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."', 105, 240, { align: "center" });

    // Footer Text
    doc.setFontSize(10);
    doc.text("Made by Epic Byte Studio", 105, 255, { align: "center" });

    pdfURL = URL.createObjectURL(doc.output("blob"));

    document.getElementById("generateBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "block";
    document.getElementById("viewPDF").style.display = "block";
    document.getElementById("downloadPDF").style.display = "block";
}

// Split long text into two lines if it exceeds the width (28mm space)
function splitText(text, maxLength) {
    if (text.length > maxLength) {
        return [text.substring(0, maxLength), text.substring(maxLength)];
    }
    return [text];
}

// View PDF
function viewPDF() {
    window.open(pdfURL, "_blank");
}

// Download PDF
function downloadPDF() {
    const a = document.createElement("a");
    a.href = pdfURL;
    a.download = "Assignment_Cover.pdf";
    a.click();
}

// Restart Form
function restartForm() {
    location.reload();
}
