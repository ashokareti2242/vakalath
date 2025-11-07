import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, } from "docx";
import { cell, createParagraph, headerCell, paragraphStyles, } from "../../services/templateFunctions";

export const InfoTable = (formData) => {
    const infoRows = [
        {
            cells: [
                { label: "Name of the first Petitioner:", value: formData?.PETITIONER_NAME || "«PETITIONER_NAME»" },
                { label: "Age:", value: formData?.R23 || "«R23»" },
            ]
        },
        {
            cells: [
                { label: "Name of the first Respondent:", value: formData?.RESPONDENT_NAME || "«RESPONDENT_NAME»" },
                { label: "Age:", value: formData?.R24 || "«R24»" },
            ]
        },
        {
            cells: [
                { label: "District Name:", value: formData?.district || "«district»" },
                { label: "Bar Council Enrollment No.:", value: formData?.R25 || "«R25»" },
            ]
        },
        {
            singleRow: true,
            label: "Name of the Counsel & Code:",
            value: formData?.counsel_code || "«counsel_code»",
        },
    ];
    const tableRows = infoRows.map((row) => {
        if (row.singleRow) {
            return new TableRow({
                children: [
                    cell(row.label),
                    headerCell(row.value, { colSpan: 3 }),
                ],
            });
        } else {
            return new TableRow({
                children: [
                    cell(row.cells[0].label),
                    cell(row.cells[0].value),
                    cell(row.cells[1].label),
                    cell(row.cells[1].value),
                ],
            });
        }
    });

    return [
        createParagraph("I.", paragraphStyles.heading),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: tableRows,
        }),
    ];
};
