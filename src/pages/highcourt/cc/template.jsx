import { Document, Packer, Table, TableRow, TableCell, WidthType } from "docx";
import { saveAs } from "file-saver";
import { createParagraph, paragraphStyles } from "../../../services/templateFunctions";

export const ContemptAffidavitTemplate = (formData) => {
  return new Document({
    sections: [
      {
        properties: {},
        children: [
          createParagraph("«highcourt»", paragraphStyles.mainHeadingCenter),
          createParagraph(`CONTEMPT CASE No.                            OF ${formData?.myear || "«myear»"}`, paragraphStyles.centerText),
          
          createParagraph("IN", paragraphStyles.centerText),
          createParagraph(`«OPNO»`, paragraphStyles.centerText),
          
          createParagraph("BETWEEN:", paragraphStyles.leftAlignText),
          createParagraph(`«petitioner_address»`, paragraphStyles.leftAlignText),
          createParagraph("..Petitioner/s", paragraphStyles.rightAlignText),
          
          createParagraph("AND", paragraphStyles.leftAlignText),
          createParagraph(`«respondent_address»`, paragraphStyles.leftAlignText),
          createParagraph("..Respondent/s", paragraphStyles.rightAlignText),
          
          createParagraph("A F F I D A V I T", paragraphStyles.centerTextBig),
          
          createParagraph(`I, «verification», now having temporarily come down to «place», do hereby solemnly and sincerely affirm and state as follows:`, paragraphStyles.paraText),
          
          createParagraph("1. I am the Petitioner herein and as such I am well acquainted with the facts of the case.", paragraphStyles.paraText),
          
          createParagraph("2. I submit that", paragraphStyles.paraText),
          createParagraph("3.", paragraphStyles.paraText),
          createParagraph("4.", paragraphStyles.paraText),
          
          createParagraph("The first respondent willfully and wantonly is not implementing orders of the Hon'ble High Court passed in «OPNO», dated «OPDATE» by His Lordship’s «lowercourt», and deliberately avoiding, and the action of the 1st respondent amounts to punishment under Sec.10 to 12 of the Contempt of Courts Act.", paragraphStyles.paraText),
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing
          createParagraph("It is therefore prayed that this Hon'ble Court may be pleased to «MAIN_PRAYER» and pass such other order or orders as may deem fit and proper in the circumstances of the case.", paragraphStyles.paraText),
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing

          createParagraph("It is therefore prayed that this Hon'ble Court may be pleased to «INTERIM_PRAYER» and pass such other order or orders as may deem fit and proper in the circumstances of the case.", paragraphStyles.paraText),
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing

          // Closing section
          createParagraph("last page corrs.", paragraphStyles.leftAlignSmall),
          createParagraph("Deponent", paragraphStyles.leftAlignText),
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing
          createParagraph("Solemnly and sincerely affirmed on", paragraphStyles.paraText),
          createParagraph("this the day of «fdate»", paragraphStyles.paraText),
          createParagraph("and signed his name in my presence.", paragraphStyles.paraText),
          
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing
          createParagraph("BEFORE ME", paragraphStyles.centerText),
          
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing
          createParagraph("ADVOCATE :: «place»", paragraphStyles.centerText),
          
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing
          
          // Verification section
          createParagraph("VERIFICATION STATEMENT", paragraphStyles.centerTextBig),
          createParagraph("I, «verification», being the petitioner/person acquainted with the facts do hereby verify and state that the contents of the above paras of the Affidavit are true and correct to the best of my knowledge.", paragraphStyles.paraText),
          createParagraph("Hence verified at «place» on this the day of «fdate»", paragraphStyles.paraText),
          
          createParagraph("", paragraphStyles.centerText), // Empty line for spacing
          createParagraph("Deponent", paragraphStyles.leftAlignText),
           ],
      },
    ],
  });
};