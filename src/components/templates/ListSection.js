import { AlignmentType, Table, TableCell, TableRow, WidthType } from "docx";
import { createParagraph, paragraphStyles } from "../../services/templateFunctions";
import { h3Left, h3Right, paragraph } from "./elementTypes";

export const listWithNumbers = (lines, type) => {
  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { size: 0 },
        bottom: { size: 0 },
        left: { size: 0 },
        right: { size: 0 },
        insideHorizontal: { size: 0 },
        insideVertical: { size: 0 },
      },
      rows: lines.map((line, i) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 3, type: WidthType.PERCENTAGE }, // narrow number column
              margins: { left: 0, right: 50, top: 0, bottom: 0 },
              children: [h3Left(type == "char" ? `${String.fromCharCode(97 + i)}.` : `${i + 1}.`)],
            }),
            new TableCell({
              width: { size: 97, type: WidthType.PERCENTAGE }, // main text cell
              margins: { left: 0, right: 0, top: 0, bottom: 0 },
              children: [h3Left(line)],
            }),
          ],
        })
      ),
    }),
  ];
};


export const listWithColon = (lines) => {
  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { size: 0 },
        bottom: { size: 0 },
        left: { size: 0 },
        right: { size: 0 },
        insideHorizontal: { size: 0 },
        insideVertical: { size: 0 },
      },
      rows: lines.map((line, i) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 10, type: WidthType.PERCENTAGE },
              margins: { left: 0, right: 0, top: 0, bottom: 0 },
              children: [h3Left(line)],
            }),
            new TableCell({
              width: { size: 90, type: WidthType.PERCENTAGE },
              margins: { left: 0, right: 50, top: 0, bottom: 0 },
              children: [h3Left(":")],
            }),

          ],
        })
      ),
    }),
  ];
}


// export const listWithColonandNumber = (lines) => {
//   return [
//     new Table({
//       width: { size: 100, type: WidthType.PERCENTAGE },
//       borders: {
//         top: { size: 0 },
//         bottom: { size: 0 },
//         left: { size: 0 },
//         right: { size: 0 },
//         insideHorizontal: { size: 0 },
//         insideVertical: { size: 0 },
//       },
//       rows: lines.map((line, i) =>
//         new TableRow({
//           children: [
//             new TableCell({
//               width: { size: 4, type: WidthType.PERCENTAGE }, // narrow number column
//               margins: { left: 0, right: 50, top: 0, bottom: 0 },
//               children: [h3Left(`${i + 1}.`)],
//             }),
//             new TableCell({
//               width: { size: 48, type: WidthType.PERCENTAGE },
//               margins: { left: 0, right: 0, top: 0, bottom: 0 },
//               children: [h3Left(line)],
//             }),
//             new TableCell({
//               width: { size: 48, type: WidthType.PERCENTAGE },
//               margins: { left: 0, right: 50, top: 0, bottom: 0 },
//               children: [h3Left(":")],
//             }),

//           ],
//         })
//       ),
//     }),
//   ];
// }

export const headerList = (header, lines) => {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { size: 0 },
      bottom: { size: 0 },
      left: { size: 0 },
      right: { size: 0 },
      insideHorizontal: { size: 0 },
      insideVertical: { size: 0 },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 10, type: WidthType.PERCENTAGE },
            margins: { left: 0, right: 0, top: 0, bottom: 0 },
            children: [h3Left(header)],
          }),
          new TableCell({
            width: { size: 80, type: WidthType.PERCENTAGE },
            margins: { left: 0, right: 0, top: 0, bottom: 0 },
            children: lines.map((line) => {
              return paragraph(line)
            })
          })
        ]
      })
    ]
  })
}

export const listWith4Columns = (lines) => {
  return [
    new Table({
      width: { size: 80, type: WidthType.PERCENTAGE },
      alignment:AlignmentType.CENTER,
      borders: {
        top: { size: 0 },
        bottom: { size: 0 },
        left: { size: 0 },
        right: { size: 0 },
        insideHorizontal: { size: 0 },
        insideVertical: { size: 0 },
      },
      rows: lines.map((line, i) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 4, type: WidthType.PERCENTAGE }, // narrow number column
              margins: { left: 0, right: 50, top: 0, bottom: 0 },
              children: [h3Left(`${i + 1}.`)],
            }),
            new TableCell({
              width: { size: 46, type: WidthType.PERCENTAGE },
              margins: { left: 0, right: 0, top: 0, bottom: 0 },
              children: [h3Left(line.key)],
            }),
            new TableCell({
              width: { size: 4, type: WidthType.PERCENTAGE },
              margins: { left: 0, right: 50, top: 0, bottom: 0 },
              children: [h3Left(":")],
            }),
            new TableCell({
              width: { size: 46, type: WidthType.PERCENTAGE },
              margins: { left: 0, right: 0, top: 0, bottom: 0 },
              children: [h3Left(line.value)],
            }),
          ],
        })
      ),
    }),
  ];
}