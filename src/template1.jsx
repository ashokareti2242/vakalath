import { Document, Packer, PageBreak, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import {
  createParagraph,
  getPetitionersParagraphs,
  paragraphStyles,
} from "../../../services/templateFunctions";
import { getDocxDocument } from "../bail/template1";

export const ABTemplate = (formData) => {
  const petitionersParagraphs = getPetitionersParagraphs(formData?.Petitioners);

  return new Document({
    sections: [
      {
        properties: {},
        children: [
          createParagraph(
            "MEMORANDUM OF CRIMINAL PETITION",
            paragraphStyles.mainHeadingCenter
          ),
          createParagraph(
            "(UNDER SECTION 438 CRIMINAL PROCEDURE CODE)",
            paragraphStyles.mainHeadingCenter
          ),
          createParagraph(
            "IN THE HIGH COURT OF JUDICATURE OF ANDHRA PRADESH",
            paragraphStyles.mainHeadingCenter
          ),
          createParagraph("AT HYDERABAD", paragraphStyles.mainHeadingCenter),
          createParagraph(
            `CRL.P.No. ${formData?.CrlpNo || "________"} OF 2007`,
            paragraphStyles.centerText
          ),
          createParagraph("BETWEEN:", paragraphStyles.leftAlignText),
          ...petitionersParagraphs,
          createParagraph("..PETITIONER/ACCUSED", paragraphStyles.rightAlignText),
          createParagraph("AND", paragraphStyles.leftAlignText),
          createParagraph(
            "THE STATE OF A.P. REP. BY",
            paragraphStyles.leftAlignSmall
          ),
          createParagraph("PUBLIC PROSECUTOR", paragraphStyles.leftAlignSmall),
          createParagraph("..RESPONDENT/COMPLAINANT", paragraphStyles.rightAlignText),
          createParagraph(
            `     The address for service of all notices and process on the above named Petitioner is that of his counsel M/s ###, Advocate, Hyderabad.`,
            paragraphStyles.paraText
          ),
          createParagraph("", paragraphStyles.emptySpace),
          createParagraph(
            "PETITION FOR ANTICIPATORY BAIL",
            paragraphStyles.underlinedHeading
          ),
          createParagraph(
            `       The petitioner is accused in Crime No. ${formData?.CrimeNumber || "____"
            } of 2007 of ${formData?.PoliceStationName || "____"
            } Police Station. He is alleged to have committed offenses punishable under Sections ${formData?.Sections || "____"
            }. He is apprehending arrest in the above crime.`,
            paragraphStyles.paraText
          ),
          ...Array.from({ length: 8 }, (_, i) =>
            createParagraph(
              `${i + 1}. The petitioner submits that`,
              paragraphStyles.bulletPoint
            )
          ),
          createParagraph('9. The petitioner submits that  he is a permanent resident of ______________________ having fixed abode and landed property and there is no question of absconding.',
            paragraphStyles.paraText
          ),
          createParagraph("", paragraphStyles.emptySpaceSmall),
          createParagraph('10.  The petitioner submits that  he filed Crl.M.P.No. _________ before the learned Sessions Judge ____________ and the same was dismissed on ________.',
            paragraphStyles.paraText
          ),
          createParagraph("", paragraphStyles.emptySpaceSmall),
          createParagraph('11.  The Petitioner submits that he is willing to furnish suitable security and abide by any conditions which this Honble Court may deem fit to impose ',
            paragraphStyles.paraText
          ),
          createParagraph("", paragraphStyles.emptySpaceSmall),
          createParagraph(
            "       It is therefore prayed that this Hon'ble Court may be pleased to direct the Station House Officer _______________ Police Station to release the Petitioner on Bail in the event of his arrest in connection with Crime No.______ of 2007 of ____________ Police Station.",
            paragraphStyles.paraText
          ),
          createParagraph("", paragraphStyles.emptySpaceSmall),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      createParagraph("HYDERABAD", paragraphStyles.leftAlignText),
                    ],
                    // Set cell width to automatically adjust
                    width: {
                      size: 100, // 50%
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [
                      createParagraph(
                        "COUNSEL FOR THE PETITIONER",
                        paragraphStyles.rightAlignText
                      ),
                    ],
                    // Set cell width to automatically adjust
                    width: {
                      size: 100, // 50%
                      type: WidthType.AUTO,
                    },
                  }),
                ],
                width: {
                  size: 100, // 50%
                  type: WidthType.PERCENTAGE,
                },
              }),
            ]
          }),

          createParagraph("DATE: ____________", paragraphStyles.leftAlignSmall),
        ]
      },
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              left: 7000,
              bottom: 720
            }
          }
        },
        children: [
          // createParagraph("", { children: [new PageBreak()] }),
          createParagraph(
            `${formData?.Place || "________"} DISTRICT`,
            paragraphStyles.centerText
          ),
          createParagraph("HIGH COURT", paragraphStyles.centerHeading),
          createParagraph('HYDERABAD', paragraphStyles.centerHeading),
          createParagraph(
            `Crl.P.No. ${formData?.CrlpNo || "________"} OF 2007`,
            paragraphStyles.centerTextBig
          ),
          createParagraph("", paragraphStyles.emptySpaceBig),
          createParagraph(
            "PETITION FOR",
            paragraphStyles.underlinedHeadingSmall
          ),
          createParagraph("ANTICIPATORY BAIL", paragraphStyles.underlinedHeadingSmall),
          createParagraph("", paragraphStyles.emptySpaceBig),
          createParagraph("M/s ### (000)", paragraphStyles.centerTextSmall),
          createParagraph("Advocate", paragraphStyles.centerTextSmall),
          createParagraph("", paragraphStyles.emptySpaceSmall),
          createParagraph("COUNSEL FOR THE", paragraphStyles.centerTextSmall),
          createParagraph('PETITIONER', paragraphStyles.centerTextSmall)
        ],
      },
    ],
  });
};


