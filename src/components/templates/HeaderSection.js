import { createParagraph, paragraphStyles } from "../../services/templateFunctions"
import { h1BoldCenter, h2BoldCenter, h3BoldCenter, h3Center, h3underlineBoldCenter, h3UnderlineCenter, LineSpace } from "./elementTypes"

export const headerWith1NumberBold = (lines) => {
    return [
        h3underlineBoldCenter(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1])
    ]
}

export const headerWith1NumberUnderline = (lines) => {
    return [
        h3UnderlineCenter(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1])
    ]
}

export const headerWith1NumberUnderlineBold = (lines) => {
    return [
        h3underlineBoldCenter(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1])
    ]
}

export const headerWith1Number = (lines) => {
    return [
        h3Center(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1])
    ]
}

export const headerWith2NumbersBold = (lines) => {
    return [
        h3BoldCenter(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1]),
        h3Center(lines[2]),
        h3Center(lines[3]),
    ]
}

export const headerWith2NumbersBoldUnderline = (lines) => {
    return [
        h3underlineBoldCenter(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1]),
        h3Center(lines[2]),
        h3Center(lines[3]),
    ]
}

export const headerWith2Numbers = (lines) => {
    return [
        h3Center(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1]),
        h3Center(lines[2]),
        h3Center(lines[3]),
    ]
}

export const headerWith2NumbersUnderline = (lines) => {
    return [
        h3UnderlineCenter(lines[0]),
        ...LineSpace(1),
        h3Center(lines[1]),
        h3Center(lines[2]),
        h3Center(lines[3]),
    ]
}
