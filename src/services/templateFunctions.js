import { AlignmentType, Packer, Paragraph, TabStopPosition, TabStopType, TextRun, UnderlineType } from "docx";

export const paragraphStyles = {
    page:{},
    mainHeadingCenter:{alignment: AlignmentType.CENTER , spacing: {after:0}},
    centerText:{alignment: AlignmentType.CENTER},
    centerTextSmall:{alignment: AlignmentType.CENTER,spacing: {after:0}},
    centerTextBig:{alignment:AlignmentType.CENTER,spacing:{before:400,after:0}},
    leftAlignSmall:{alignment:AlignmentType.LEFT,spacing: {after:0}},
    leftAlignText:{alignment:AlignmentType.LEFT},
    rightAlignText:{alignment:AlignmentType.RIGHT},
    rightAlignSmall:{alignment:AlignmentType.RIGHT,spacing:{after:0}},
    rightALignBig:{alignment:AlignmentType.RIGHT,spacing:{line:1000}},
    paraText:{alignment:AlignmentType.JUSTIFIED,spacing:{after:0}},     
    // paraTextSpace:{alignment:AlignmentType.JUSTIFIED},
    emptySpace:{spacing:{line:1000}},
    emptySpaceSmall:{spacing:{line:400}},
    emptySpaceBig:{spacing:{line:5000}},
    underlinedHeading:{alignment:AlignmentType.CENTER,bold:true,underline:{type:UnderlineType.SINGLE}},
    underlinedHeadingSmall:{alignment:AlignmentType.CENTER,bold:true,underline:{type:UnderlineType.SINGLE},spacing:{after:0}},
    underlinedHeadingRight:{alignment:AlignmentType.RIGHT,bold:true,underline:{type:UnderlineType.SINGLE},spacing:{after:0}},
    bulletPoint:{spacing:{before:100,after:1000}},
    centerHeading:{alignment:AlignmentType.CENTER,bold:true,spacing:{after:0}}
    // rigthLine:{tabStops: [
    //         new TabStopPosition({
    //           type: TabStopType.RIGHT,
    //           position: 9000, 
    //         })]}
};
// page: { spacing: { after: 0 }, alignment: AlignmentType.LEFT },
// heading: { bold: true, spacing: { after: 200 }, alignment: AlignmentType.LEFT },
// headingCenter: { bold: true, underline: {}, alignment: AlignmentType.CENTER },
// centerText: { alignment: AlignmentType.CENTER },
// startText: { alignment: AlignmentType.LEFT },
// endText: { alignment: AlignmentType.RIGHT },
// paragraph: { alignment: AlignmentType.JUSTIFIED, spacing: { line: 360 } },
// justifiedText: { alignment: AlignmentType.JUSTIFIED, spacing: { after: 200 } },
// item: { alignment: AlignmentType.LEFT },
// subItem: { alignment: AlignmentType.LEFT },
// signatureRow: { alignment: AlignmentType.LEFT },
// signatureBox: { alignment: AlignmentType.LEFT },
// alignRight: { alignment: AlignmentType.RIGHT },
// coverPage: { alignment: AlignmentType.RIGHT },
// title: { bold: true, alignment: AlignmentType.CENTER },
// subTitle: { italics: true, alignment: AlignmentType.CENTER },
// centeredText: { alignment: AlignmentType.CENTER },
// caseNo: { bold: true, alignment: AlignmentType.CENTER },
// against: { alignment: AlignmentType.CENTER },
// sectionTitle: { bold: true, alignment: AlignmentType.LEFT },
// partyLine: { alignment: AlignmentType.LEFT },
// rightAligned: { alignment: AlignmentType.RIGHT },
// groundsTitle: { bold: true, alignment: AlignmentType.CENTER },
// groundLine: { alignment: AlignmentType.LEFT },
// headingAlt: { bold: true, alignment: AlignmentType.CENTER },
// leftText: { alignment: AlignmentType.LEFT },
// rightText: { alignment: AlignmentType.RIGHT },
// center: { alignment: AlignmentType.CENTER },
// row: { alignment: AlignmentType.LEFT },
// headerRow: { bold: true, alignment: AlignmentType.LEFT },
// hr: { alignment: AlignmentType.LEFT },
// officeUseBlock: { alignment: AlignmentType.LEFT },
// battaRow: { alignment: AlignmentType.LEFT },
// rightLane: { alignment: AlignmentType.RIGHT }


export const createParagraph = (text, options = {}) =>
    new Paragraph({
        children: [new TextRun({ text, ...options })],
        alignment: options.alignment || AlignmentType.LEFT,
        spacing: options.spacing || { line: 800 },
    });

export const getPetitionersParagraphs = (petitioners = []) => {
    return petitioners
        .map((pet) => [
            createParagraph(pet.Name,paragraphStyles.leftAlignSmall),
            createParagraph(pet.Address,paragraphStyles.leftAlignSmall),
        ])
        .flat();
};

// export const generateAndDownloadDocx = (formData) => {
//   const doc = ABTemplate(formData);
//   Packer.toBlob(doc).then((blob) => saveAs(blob, "HighCourtBail.docx"));
// };
