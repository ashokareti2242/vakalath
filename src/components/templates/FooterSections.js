import { Table, TableCell, TableRow, WidthType } from "docx"
import { h3Center, h3Left, LineSpace } from "./elementTypes"

export const create4LineFooter = (lines) => {
    return [
        h3Left(lines[0]),
        ...LineSpace(3),
        h3Left(lines[1]),
        h3Left(lines[2]),
        h3Center(lines[3])
    ]
}

export const create5LineFooter = (lines) => {
    return [
        h3Left(lines[0]),
        ...LineSpace(3),
        h3Left(lines[1]),
        h3Left(lines[2]),
        ...LineSpace(1),
        h3Center("-----------------"),
        h3Left(lines[3]),
        h3Left(lines[4])
    ]
}

export const create3LineFooter = (lines) => {
    return [
        h3Left(lines[0]),
        ...LineSpace(1),
        h3Left(lines[1]),
        h3Left(lines[2])
    ]
}

export const createSignatureFooter = (cell1, cell2) => {
    return new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: cell1.map((text) => h3Left(text)),
                        width: {
                            size: 50,
                            type: WidthType.PERCENTAGE
                        },
                    }),
                    new TableCell({
                        children: cell2.map((text) => h3Left(text)),
                        width: {
                            size: 30,
                            type: WidthType.PERCENTAGE
                        },
                    }),
                ]
            }),
        ],
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