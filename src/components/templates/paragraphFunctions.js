import { Paragraph, TextRun } from "docx";
import { createParagraph, paragraphStyles } from "../../services/templateFunctions"
import { h3Center } from "./elementTypes";


export const addParagraphs = (paragraphs) => {
    const generatedParas = paragraphs.flatMap((para) => {
        return [
            createParagraph(para, paragraphStyles.paraText),
            createParagraph("", paragraphStyles.emptySpaceSmall),
        ]
    })
    return generatedParas;
}

export const centeredPara = (paragraphs) => {
    return paragraphs.flatMap((para) => {
        return h3Center(para)
    })
}

export const nestedParagraph = (text1,text2, options1 = {}, options2={}) =>{
    return new Paragraph({
        children: [new TextRun({ text:text1+ ":", ...options1 }),new TextRun({text:" "+text2,...options2})],
        // alignment: options1.alignment || options2.alignment || AlignmentType.LEFT,
        // spacing: options2.spacing || options2.spacing || { line: 800 },
    });
}

export const HeaderParagraph = (title,para)=>{
    return nestedParagraph(title,para, paragraphStyles.underlinedHeadingLeft , paragraphStyles.paraText)
}