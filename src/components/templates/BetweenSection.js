import { Paragraph, TextRun, AlignmentType, Spacing, } from "docx";
import { createParagraph, paragraphStyles } from "../../services/templateFunctions";

export const BetweenSection = (formData,petSign,resSign) => {

    return [
        createParagraph("Between:", paragraphStyles.leftAlignSmall),
        ...formData?.Petitioners.flatMap((pet) => [
            createParagraph(pet?.Name, {...paragraphStyles.leftAlignSmall,spacing:{before:150}}),
            createParagraph(pet?.Address,paragraphStyles.leftAlignSmall),
        ]),
        createParagraph(petSign, paragraphStyles.rightAlignSmall),
        createParagraph("AND", paragraphStyles.leftAlignSmall),
        ...formData?.Respondents.flatMap((res) => [
            createParagraph(res?.Name, {...paragraphStyles.leftAlignSmall,spacing:{before:150}}),
            createParagraph(res?.Address,paragraphStyles.leftAlignSmall),
        ]),
        createParagraph(resSign, paragraphStyles.rightAlignText),
    ];
};
