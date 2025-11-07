import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, Columns, } from "docx";
import { cell, headerCell } from "../../services/templateFunctions";
import officeUseTableData from "../../assets/officeUseTableData.json"

export const OfficeUseTable = (file,formData) => {
    return [
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: [
                        headerCell("FOR OFFICE USE ONLY", { colSpan:3}),
                    ],
                }),
                new TableRow({
                    children: [
                        headerCell(""),
                        headerCell("No."),
                        headerCell("Year"),
                    ],
                }),
                new TableRow({
                    children: [
                        headerCell("Filing No. (Unregistered)"),
                        headerCell(officeUseTableData[file],{alignment: AlignmentType.LEFT}),
                        headerCell(formData?.myear || "«myear»"),
                    ],
                }),
                new TableRow({  
                    children: [
                        headerCell("Main No. (Registered)"),
                        headerCell(officeUseTableData[file],{alignment: AlignmentType.LEFT}),
                        headerCell(formData?.myear || "«myear»"),
                    ],
                }),
            ],
        }),
    ];
};
