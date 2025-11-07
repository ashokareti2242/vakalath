import { AlignmentType, Table, TableCell, TableRow, WidthType } from "docx";
import { cell, createParagraph, headerCell, paragraphStyles } from "../../services/templateFunctions";


export const createRightAlignPage = (lines) => {
    return new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [""],
                        width: {
                            size: 55,
                            type: WidthType.PERCENTAGE
                        }
                    }),
                    new TableCell({
                        children: lines.map((line) => line),
                        width: {
                            size: 45,
                            type: WidthType.PERCENTAGE
                        }
                    }),
                ]
            })
        ],
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
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

export const TableWithBorder = ({headers,nrows,styles = {},num})=>{
    let ctext = num ? 1 : "" ;
    // console.log(typeof ctext);
    return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        rows:[
            new TableRow({
                children: headers.map((header)=>{
                    return styles.bold ? headerCell(header,styles) : cell(header,{alignment:AlignmentType.CENTER})
                })
            }),
            ...Array.from({length:nrows},(_)=>{
                return new TableRow({
                    children: headers.map((header,i)=>{
                        let text;
                        if(i==0 && typeof ctext == 'number'){
                            text=ctext;
                            ctext++;
                        }
                        else{
                            text=""
                        }
                        return cell(text.toString(),{alignment:AlignmentType.CENTER,...styles})
                    })
                })
            })
        ]
    })
}

export const TableHeader = ({headers,styles={}})=>{
    let borderStyle = styles?.border ? { size: 1, color:"#000000" } : { size : 0 }
    return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        rows:[
            new TableRow({
                children: headers.map((header)=>{
                    return styles.bold ? headerCell(header,styles) : cell(header,{alignment:AlignmentType.CENTER})
                })
            })
        ],
        borders: {
            top: borderStyle,
            bottom: borderStyle,
            left: { size: 0 },
            right: { size: 0 },
            insideHorizontal: { size: 0 },
            insideVertical: { size: 0 },
        }
    })
}