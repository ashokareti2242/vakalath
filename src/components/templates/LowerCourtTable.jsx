import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, Columns, } from "docx";
import { cell, createParagraph, headerCell, paragraphStyles } from "../../services/templateFunctions";

export const LowerCourtTable = (formData) => {
    return [
        createParagraph("III. Lower Court Details: (for Civil and Criminal Cases Only)", paragraphStyles.leftunderlinedHeading),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
                new TableRow({
                    children: [
                        cell("Case Type"),
                        cell("Case No."),
                        cell("Case Year"),
                        cell("Order Date"),
                        cell("Name of the Lower Court / any other"),
                    ],
                }),
                new TableRow({
                    children: [
                        cell(formData?.case_no || "«OPNO»", { alignment: AlignmentType.CENTER,colSpan:3 }),
                        cell(formData?.order_date || "«OPDATE»", { alignment: AlignmentType.CENTER }),
                        cell(formData?.lower_court || "«lowercourt»", { alignment: AlignmentType.CENTER }),
                    ],
                }),

            ],
        }),
    ];
};
