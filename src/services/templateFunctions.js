import { AlignmentType, Packer, Paragraph, TableCell, TabStopPosition, TabStopType, TextRun, UnderlineType } from "docx";
import { Table, WidthType } from "docx";
import { h3BoldCenter, h3Center, h3underlineBoldCenter, h3UnderlineCenter } from "../components/templates/elementTypes";
import { AffipetTemplate } from "../pages/highcourt/aa/template";

export const paragraphStyles = {
    centerText: { alignment: AlignmentType.CENTER },
    centerTextSmall: { alignment: AlignmentType.CENTER, spacing: { after: 0 } },
    centerTextBig: { alignment: AlignmentType.CENTER, spacing: { before: 400, after: 0 } },
    leftAlignSmall: { alignment: AlignmentType.LEFT, spacing: { after: 0 } },
    leftAlignText: { alignment: AlignmentType.LEFT },
    rightAlignText: { alignment: AlignmentType.RIGHT },
    rightAlignSmall: { alignment: AlignmentType.RIGHT, spacing: { after: 0 } },
    rightALignBig: { alignment: AlignmentType.RIGHT, spacing: { line: 1000 } },
    paraText: { alignment: AlignmentType.JUSTIFIED, spacing: { after: 0 } },
    emptySpace: { spacing: { line: 1000 } },
    emptySpaceSmall: { spacing: { line: 400 } },
    emptySpaceBig: { spacing: { line: 5000 } },
    singleSpace:{spacing:{line:200}},
    underlinedHeading: { alignment: AlignmentType.CENTER, bold: true, underline: { type: UnderlineType.SINGLE } },
    underlinedHeadingSmall: { alignment: AlignmentType.CENTER, bold: true, underline: { type: UnderlineType.SINGLE }, spacing: { after: 0 } },
    underlinedHeadingRight: { alignment: AlignmentType.RIGHT, bold: true, underline: { type: UnderlineType.SINGLE }, spacing: { after: 0 } },
    underlinedHeadingLeft: { alignment: AlignmentType.LEFT, bold: true, underline: { type: UnderlineType.SINGLE }, spacing: { after: 0 } },
    underlinedTextSmall: { alignment: AlignmentType.CENTER, underline: { type: UnderlineType.SINGLE }, spacing: { after: 0 } },
    underlinedText: { alignment: AlignmentType.CENTER, underline: { type: UnderlineType.SINGLE }, spacing: { after: 400 } },
    bulletPoint: { spacing: { before: 100, after: 1000 } },
    centerHeading: { alignment: AlignmentType.CENTER, bold: true, spacing: { after: 0 } }
};

export const createParagraph = (text, options = {}) =>
    new Paragraph({
        children: [new TextRun({ text, ...options })],
        alignment: options.alignment || AlignmentType.LEFT,
        spacing: options.spacing || { line: 800 },
    });


export const generateAndDownloadDocx = (formData) => {
    const doc = AffipetTemplate(formData);
    Packer.toBlob(doc).then((blob) => saveAs(blob, "AffipetTemplate.docx"));
};



export function createDocxCoverSection(childrenContent, leftMargin) {
    return {
        properties: {
            page: {
                margin: {
                    top: 720,
                    right: 720,
                    left: leftMargin,
                    bottom: 720
                }
            }
        },
        children: childrenContent,
    };
}

export function createDocxFooterTable(rows) {
    return new Table({
        rows: rows,
        width: {
            size: 8835,
            type: WidthType.DXA
        },
        borders: {
            top: { size: 0 },
            bottom: { size: 0 },
            left: { size: 0 },
            right: { size: 0 },
            insideHorizontal: { size: 0 },
            insideVertical: { size: 0 },
        }
    })
}

export const headerCell = (text, options) =>{
    let child = options?.underlineHead ? h3underlineBoldCenter(text) : h3BoldCenter(text) 
    return new TableCell({
        children: [
            child,
        ],
        columnSpan: options?.colSpan || 1,
    });
}

export const cell = (text, options) =>{
    let child = options?.underlineCell ? h3UnderlineCenter(text) : h3Center(text);
    return new TableCell({
        // width: { size: options?.width , type: WidthType.PERCENTAGE },
        columnSpan: options?.colSpan || 1,
        children: [ child ],
    });
}