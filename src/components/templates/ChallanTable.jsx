import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } from "docx";
import { cell, createParagraph, paragraphStyles } from "../../services/templateFunctions";

export const ChallanTable = (formData) => {
    const feeItems = [
        { label: "Court Fee", key: "court_fee", default: "Rs." },
        { label: "Carbon Copy", key: "carbon_copy", default: "Rs.15/-" },
        { label: "Vakalath", key: "vakalath", default: "Rs.105/-" },
        { label: "Batta in Main Case (Process Fees)", key: "batta_main", default: "Rs." },
        { label: "IA (MPs) Court Fee", key: "ia_court_fee", default: "Rs." },
        { label: "Batta in IA (MPs) (Process Fees)", key: "batta_ia", default: "Rs." },
        { label: "IA (MPs) Court Fee", key: "ia2_court_fee", default: "Rs." },
        { label: "Batta in IA (MPs) (Process Fees)", key: "batta_ia2", default: "Rs." },
        { label: "IA (MPs) Court Fee", key: "ia3_court_fee", default: "Rs." },
        { label: "Batta in IA (MPs) (Process Fees)", key: "batta_ia3", default: "Rs." },
        { label: "Total", key: "total_fee", default: "Rs." },
    ];

    const tableRows = feeItems.map(item => 
        new TableRow({
            children: [
                cell(item.label, { alignment: AlignmentType.CENTER, width: 70 }),
                cell(formData?.[item.key] || item.default, { width: 30 }),
            ],
        })
    );

    return [
        createParagraph("II. Fee paid by : Challan / Stamps", paragraphStyles.heading),
        createParagraph("Challan Date:", paragraphStyles.heading),
        new Table({
            width: { size: 50, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: tableRows,
        }),
    ];
};
