import { Document, Packer, PageBreak, AlignmentType, Table, TableRow, TableCell, WidthType } from "docx";
import { saveAs } from "file-saver";
import {
    createDocxCoverSection,
    createDocxFooterTable,
    createParagraph,
    paragraphStyles,
} from "../../../services/templateFunctions";
import { BetweenSection } from "../../../components/templates/BetweenSection";
import { pageBreak } from "../../../components/templates/elementTypes";
import { createRightAlignPage } from "../../../components/templates/tableFunctions";
// import { getDocxDocument } from "../bail/template1";

export const AffipetTemplate = (formData) => {
    let fData = {};
    fData.Petitioners = [
        {
            Name: "Petitioner One",
            Address: "123 First Street, Springfield"
        },
        {
            Name: "Petitioner Two",
            Address: "456 Second Avenue, Shelbyville"
        },
        {
            Name: "Petitioner Three",
            Address: "789 Third Boulevard, Capital City"
        }
    ];
    fData.Respondents = [
        {
            Name: "Respondent One",
            Address: "123 First Street, Springfield"
        },
        {
            Name: "Respondent Two",
            Address: "456 Second Avenue, Shelbyville"
        },
        {
            Name: "Respondent Three",
            Address: "789 Third Boulevard, Capital City"
        }
    ]

    const coverChildren = [
        createParagraph(
            `IN THE COURT OF THE`,
            paragraphStyles.underlinedTextSmall
        ),
        createParagraph(`<District>`, paragraphStyles.underlinedText),
        createParagraph(
            `I.A.No.                 OF <myyear>`,
            paragraphStyles.centerTextSmall
        ),
        createParagraph('IN', paragraphStyles.centerTextSmall),
        createParagraph(
            `O.S.No.                  OF <myyear>`,
            paragraphStyles.centerTextSmall
        ),
        createParagraph("", paragraphStyles.emptySpaceSmall),
        ...BetweenSection(fData,"..Petitioner/Plaintiff","..Respondent/Defendant"),
        createParagraph("", paragraphStyles.emptySpace),
        createParagraph(
            "PETITION FILED UNDER SECTION",
            paragraphStyles.underlinedHeadingSmall
        ),
        // createParagraph("OF CIVIL RULES OF PRACTICE", paragraphStyles.underlinedHeadingSmall),
        // createParagraph("READ WITH SECTION 151 OF C.P.C.", paragraphStyles.underlinedHeadingSmall),
        createParagraph("", paragraphStyles.emptySpace),
        createParagraph(`FILED ON: <fDate>>`, paragraphStyles.centerText),
        createParagraph("", paragraphStyles.emptySpace),
        createParagraph("FILED BY:", paragraphStyles.leftAlignSmall),
        createParagraph(`M/s <counsel_Address>`, paragraphStyles.leftAlignSmall),
        createParagraph("COUNSEL FOR PETITIONER", paragraphStyles.rightAlignSmall)
    ];

    const tableRows1 = [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        createParagraph(`last page corrs.`, paragraphStyles.leftAlignSmall),
                        createParagraph(`Solemnly and sincerely affirm this`, paragraphStyles.leftAlignSmall),
                        createParagraph(`the day of  «fdate»`, paragraphStyles.leftAlignSmall),
                        createParagraph(`and signed his name in my presence.`, paragraphStyles.leftAlignSmall)
                    ],
                    width: {
                        size: 50,
                        type: WidthType.PERCENTAGE,
                    },
                }),
                new TableCell({
                    children: [
                        createParagraph(
                            "Deponent",
                            paragraphStyles.rightAlignText
                        ),
                    ],
                    width: {
                        size: 50,
                        type: WidthType.AUTO,
                    },
                }),
            ],
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
        }),
    ]

    const tableRows2 = [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        createParagraph(`Date: «fdate»`, paragraphStyles.leftAlignSmall),
                        createParagraph(`«station»`, paragraphStyles.leftAlignSmall),
                    ],
                    width: {
                        size: 50,
                        type: WidthType.PERCENTAGE,
                    },
                }),
                new TableCell({
                    children: [
                        createParagraph(
                            "Counsel for Petitioner",
                            paragraphStyles.rightAlignText
                        ),
                    ],
                    width: {
                        size: 50,
                        type: WidthType.AUTO,
                    },
                }),
            ],
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
        }),
    ]


    return new Document({
        sections: [
            {
                properties: {},
                children: [
                    createParagraph(
                        `IN THE COURT OF THE <district>`,
                        paragraphStyles.centerText
                    ),
                    createParagraph(
                        `I.A.No.                 OF <myyear>`,
                        paragraphStyles.centerTextSmall
                    ),
                    createParagraph('IN', paragraphStyles.centerTextSmall),
                    createParagraph(
                        `O.S.No.                 OF <myyear>`,
                        paragraphStyles.centerTextSmall
                    ),
                    ...BetweenSection(fData,"..Petitioner/Plantiff","..Respondent/Defendant"),
                    createParagraph(
                        "AFFIDAVIT",
                        paragraphStyles.underlinedHeading
                    ),
                    createParagraph("", paragraphStyles.emptySpaceSmall),
                    createParagraph("     I, «interim_prayer», do hereby solemnly and sincerely affirm and sincerely state on oath as follows:",
                        paragraphStyles.paraText
                    ),
                    createParagraph('', paragraphStyles.emptySpaceSmall),
                    createParagraph('1.   I am the Petitioner herein and Plaintiff in the main suit and as such I am well acquainted with the facts of the case. ',
                        paragraphStyles.paraText
                    ),
                    createParagraph("", paragraphStyles.emptySpaceSmall),
                    createParagraph("2.I submit that", paragraphStyles.leftAlignText),
                    createParagraph("", paragraphStyles.emptySpaceSmall),
                    createParagraph("               It is therefore prayed that this Hon'ble Court may be pleased to ___________pending disposal of the suit as other I will be put to irreparable loss and injury and pass such other order or orders as this Hon’ble Court deems fit and proper in the circumstances of the suit. ",
                        paragraphStyles.paraText
                    ),
                    createParagraph("", paragraphStyles.emptySpaceSmall),
                    createDocxFooterTable(tableRows1),
                    createParagraph("BEFORE ME", paragraphStyles.centerTextBig),
                    createParagraph(`ADVOCATE :: «station»`, paragraphStyles.centerText),
                    createParagraph("", { children: [new PageBreak()] }),
                    createParagraph(
                        `IN THE COURT OF THE <district>`,
                        paragraphStyles.centerText
                    ),
                    createParagraph(
                        `I.A.No.                 OF <myyear>`,
                        paragraphStyles.centerTextSmall
                    ),
                    createParagraph('IN', paragraphStyles.centerTextSmall),
                    createParagraph(
                        `O.S.No.                 OF <myyear>`,
                        paragraphStyles.centerTextSmall
                    ),
                    ...BetweenSection(fData,"..Petitioner/Plaintiff","..Respondent/Defendant"),
                    createParagraph("PETITION FILED UNDER SECTION ", paragraphStyles.underlinedHeadingSmall),
                    // createParagraph("READ WITH SECTION 151 OF C.P.C.", paragraphStyles.underlinedHeadingSmall),
                    createParagraph("", paragraphStyles.emptySpaceSmall),
                    createParagraph("       For the reasons stated in the accompanying affidavit, the petitioner / plaintiff prays that this Hon'ble Court may be pleased to ________________ pending disposal of the suit and pass such other order or orders as this Hon’ble Court may deem fit and proper in the circumstances of the suit. ",
                        paragraphStyles.paraText
                    ),
                    createParagraph("", paragraphStyles.emptySpaceSmall),
                    createDocxFooterTable(tableRows2),
                    pageBreak(),
                    createRightAlignPage(coverChildren)
                ]
            },
            // createDocxCoverSection(coverChildren, 6780),
        ],
    });
};