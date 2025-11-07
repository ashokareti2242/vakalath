import { Document, Packer, PageBreak, AlignmentType, Table, TableRow, TableCell, WidthType } from "docx";
import { cell, createDocxCoverSection, createDocxFooterTable, createParagraph, headerCell, paragraphStyles } from "../../../services/templateFunctions";
import { createRightAlignPage, TableWithBorder } from "../../../components/templates/tableFunctions";
import { BetweenSection } from "../../../components/templates/BetweenSection";
import { addParagraphs, centeredPara, HeaderParagraph } from "../../../components/templates/paragraphFunctions";
import { h1BoldCenter, h2Center, h3Center, h3Left, h3Right, h3underlineBoldCenter, h3UnderlineCenter, LineSpace, pageBreak, tabSpace } from "../../../components/templates/elementTypes";
import { create4LineFooter, createSignatureFooter } from "../../../components/templates/FooterSections";
import { headerWith1Number, headerWith1NumberUnderline, headerWith1NumberUnderlineBold, headerWith2Numbers, headerWith2NumbersBold, headerWith2NumbersBoldUnderline, headerWith2NumbersUnderline } from "../../../components/templates/HeaderSection";
import { headerList, listWith4Columns, listWithColon, listWithNumbers } from "../../../components/templates/ListSection";

export const generateFullArbitrationBundle = (formData) => {
    let fData = {};
    fData.Petitioners = [
        {
            Name: "Petitioner One",
            Address: "123 First Street, Springfield"
        },
        {
            Name: "Petitioner Two",
            Address: "456 Second Avenue, Shelbyville"
        },
        {
            Name: "Petitioner Three",
            Address: "789 Third Boulevard, Capital City"
        }
    ];
    fData.Respondents = [
        {
            Name: "Respondent One",
            Address: "123 First Street, Springfield"
        },
        {
            Name: "Respondent Two",
            Address: "456 Second Avenue, Shelbyville"
        },
        {
            Name: "Respondent Three",
            Address: "789 Third Boulevard, Capital City"
        }
    ]

    // --- Utility Block Components (Footers/Tables) ---

    // Footer 1: Date/Station on Left, Petitioner/Deponent on Right (Placeholders hardcoded)
    const getCounselPetitionerFooter = (rightText) => new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            createParagraph("Date: «fdate»", paragraphStyles.leftAlignSmall),
                            createParagraph("«station»", paragraphStyles.leftAlignSmall),
                        ],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                        children: [createParagraph(rightText, paragraphStyles.rightAlignText)],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                ],
            }),
        ],
    });

    const tableRows1 = [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        // createParagraph(`last page corrs.`, paragraphStyles.leftAlignSmall),
                        createParagraph(`Counsel for petitioner`, paragraphStyles.leftAlignSmall),
                        createParagraph(`DATE: «fdate»`, paragraphStyles.leftAlignSmall),
                        createParagraph(`station`, paragraphStyles.leftAlignSmall)
                    ],
                    width: {
                        size: 50,
                        type: WidthType.PERCENTAGE,
                    },
                }),
                new TableCell({
                    children: [
                        createParagraph(
                            "Petitioner",
                            paragraphStyles.rightAlignText
                        ),
                    ],
                    width: {
                        size: 50,
                        type: WidthType.AUTO,
                    },
                }),
            ],
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
        }),
    ]

    const tableRows2 = [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        createParagraph(`DATE: «fdate»`, paragraphStyles.leftAlignSmall),
                        createParagraph(`station`, paragraphStyles.leftAlignSmall)
                    ],
                    width: {
                        size: 50,
                        type: WidthType.PERCENTAGE,
                    },
                }),
                new TableCell({
                    children: [
                        createParagraph(
                            "Petitioner",
                            paragraphStyles.rightAlignText
                        ),
                    ],
                    width: {
                        size: 50,
                        type: WidthType.AUTO,
                    },
                }),
            ],
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
        }),
    ]

    const firstCoverLines = [
        ...headerWith1Number([`IN THE COURT OF THE «district»`, `O.P.No.                 OF <myyear>`]),
        ...LineSpace(1),
        ...BetweenSection(fData, "...Petitioner", "...Respondent/s"),
        ...LineSpace(5),
        h3underlineBoldCenter("PETITION FILED UNDER SEC.9 OF"),
        h3underlineBoldCenter("ARBITRATION & CONCILIATION ACT,"),
        h3underlineBoldCenter("1996"),
        ...LineSpace(5),
        ...create4LineFooter([`FILED ON: «fdate»`, "FILED BY:", `M/s <counsel_Address>`, "COUNSEL FOR PETITIONER"]),
    ]
    
    const secondCoverLines = [
        ...headerWith2NumbersUnderline([`IN THE COURT OF THE «district»`, `I.A.No.                      OF «myear»`, "IN", `O.P.No.                 OF <myyear>`]),
        ...LineSpace(1),
        ...BetweenSection(fData, "...Petitioner", "...Respondent/s"),
        ...LineSpace(5),
        h3underlineBoldCenter("PETITION FILED"),
        h3underlineBoldCenter("UNDER ORDER-39,"),
        h3underlineBoldCenter("RULE 1 & 2 R/W.SEC.151 CPC"),
        ...LineSpace(5),
        ...create4LineFooter([`FILED ON: «fdate»`, "FILED BY:", `M/s <counsel_Address>`, "COUNSEL FOR PETITIONER"]),
    ]

    // --- 1. MAIN ORIGINAL PETITION (O.P.) SECTION ---
    const mainOPChildren = [
        createParagraph("IN THE COURT OF THE «district»", paragraphStyles.underlinedHeading),
        createParagraph("O.P.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        // createParagraph("BETWEEN:", paragraphStyles.centerTextSmall),

        // [cite_start]// Use BetweenSection for petitioner/respondent addresses [cite: 213, 216]
        ...BetweenSection(fData, "..Petitioner/s", "..Respondent/s"),

        createParagraph("PETITION FILED UNDER SECTION 9 OF", paragraphStyles.underlinedHeadingSmall),
        createParagraph("THE ARBITRATION AND CONCILIATION ACT, 1996", paragraphStyles.underlinedHeadingSmall),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        // Content
        createParagraph("1.   DESCRIPTION AND ADDRESS OF PETITIONER/S:", paragraphStyles.underlinedHeadingLeft),
        createParagraph("«petitioner_address»", paragraphStyles.leftAlignText),
        createParagraph("The address of the Petitioner for the purpose of service of all notices, summons and process etc., is that of their counsel M/s «counsel_address1»", paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        createParagraph("2.   DESCRIPTION AND ADDRESS OF RESPONDENTS:", paragraphStyles.underlinedHeadingLeft),
        createParagraph("«respondent_address»", paragraphStyles.leftAlignText),
        createParagraph("The address of the respondent for the purpose of service of all notices, summons and process etc., is the same as mentioned above.", paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        // Factual & Legal Submissions
        createParagraph("3.   The Petitioner submit that (Type Facts of the case)", paragraphStyles.leftAlignSmall),
        createParagraph("", paragraphStyles.emptySpace),
        createParagraph("Hence, this petition.", paragraphStyles.leftAlignSmall),
        createParagraph("", paragraphStyles.emptySpaceSmall),
        HeaderParagraph("CAUSE OF ACTION :", "   The cause of action arose when some third parties belong to the respondents herein came to the schedule properties herein and were trying to change the nature and character of the schedule properties by making constructions illegally. Hence the petition is filed within time and not barred by limitation."),
        ...LineSpace(1),
        HeaderParagraph("COURT FEES:", "   A fixed court fee of Rs.10/- is paid herewith under Section 9 of the Arbitration and Conciliation Act, which is just and sufficient."),
        createParagraph("", paragraphStyles.emptySpaceSmall),
        HeaderParagraph("JURISDICTION", "This Hon'ble Court has got territorial and pecuniary jurisdiction to try the petition as the schedule properties are situated within the jurisdiction and the cause of action accrued within the jurisdiction and there are no impediments in law for this Hon’ble Court to try the petition and pass orders."),
        ...LineSpace(1),
        HeaderParagraph("LIMITATION", "   The OP is filed by the petitioner is within the time of limitation."),
        ...LineSpace(1),
        HeaderParagraph("PRAYER:", "   herefore, it is prayed that this Hon’ble Court may be pleased to pass a judgment and decree in favour of the petitioners herein against the respondents in the following terms:"),
        ...LineSpace(1),
        createParagraph("a)	restrain the respondents, their men, agents, representatives, assignees, executors, etc., claiming through and under them, from altering, encumbering and alienating any part and portion of the Schedules A and B Properties herein until disposal of proceedings under Section 34 of the Arbitration and Conciliation Act in OP.No. ____ of «myear» on the file of the _______. ",
            paragraphStyles.paraText
        ),
        createParagraph("b)	Costs of the suit", paragraphStyles.paraText),
        createParagraph("c)	And pass such other and further relief(s) as this Hon’ble court may deem fit and proper in the circumstances of the case.",
            paragraphStyles.paraText
        ),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        // SIGNATURE FOOTER 1
        createDocxFooterTable(tableRows1),
        createParagraph("", paragraphStyles.emptySpace),

        // VERIFICATION 1
        createParagraph("VERIFICATION", paragraphStyles.underlinedHeading),
        createParagraph("       I, «interim_prayer», herein do hereby declare that the facts stated in the paras __ are true and correct to the best of my knowledge, belief and information and as per legal advise received.Hence verified at «station» on this day.", paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),
        createDocxFooterTable(tableRows2),

        // SCHEDULE A & B + VERIFICATION 2
        // createParagraph("", { children: [new PageBreak()] }),
        createParagraph("SCHEDULE “A” PROPERTY", paragraphStyles.underlinedHeading),
        createParagraph("       All that part and parcel of land bearing Survey No.__, admeasuring ______ out of the total extent of Ac._____ gts in ________ Village, __________ District bounded by:",
            paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),
        createParagraph("NORTH :", paragraphStyles.leftAlignSmall),
        createParagraph("SOUTH :", paragraphStyles.leftAlignSmall),
        createParagraph("EAST :", paragraphStyles.leftAlignSmall),
        createParagraph("WEST :", paragraphStyles.leftAlignSmall),
        createParagraph("", paragraphStyles.emptySpace),

        createParagraph("SCHEDULE “B” PROPERTY", paragraphStyles.underlinedHeading),
        createParagraph("All that part and parcel of land bearing Survey No.__, admeasuring ______ out of the total extent of Ac._____ gts in ________ Village, __________ District bounded by:",
            paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),
        createParagraph("NORTH :", paragraphStyles.leftAlignSmall),
        createParagraph("SOUTH :", paragraphStyles.leftAlignSmall),
        createParagraph("EAST :", paragraphStyles.leftAlignSmall),
        createParagraph("WEST :", paragraphStyles.leftAlignSmall),
        createParagraph("", paragraphStyles.emptySpace),

        // VERIFICATION 2 (Schedule)
        createDocxFooterTable(tableRows2),
        createParagraph("", paragraphStyles.emptySpace),
        createParagraph("VERIFICATION", paragraphStyles.underlinedHeading),
        createParagraph("       I, «interim_prayer» herein do hereby declare that the contents and particulars of the suit schedule are true and correct to the best of my knowledge, belief and information.Hence verified at «station» on this day.",
            paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),
        createDocxFooterTable(tableRows2),

        // LIST OF DOCUMENTS
        // createParagraph("", { children: [new PageBreak()] }),
        createParagraph("LIST OF DOCUMENTS", paragraphStyles.underlinedHeading),
        // createParagraph("", paragraphStyles.emptySpace),

        // Table for List of Documents
        // createTopHeaderTable(documentsTableRows),
        TableWithBorder({
            headers: ["SNo.", "DATE", "DESCRIPTION OF DOCUMENTS", "REMARKS"],
            nrows: 5,
            styles: { bold: true, underlineHead: true },
            num: true
        }),
        createParagraph("", paragraphStyles.emptySpace),
        createDocxFooterTable(tableRows1),
        pageBreak(),
        createRightAlignPage(firstCoverLines)
    ];

    // --- 2. INJUNCTION I.A. AFFIDAVIT SECTION ---
    const injunctionAffidavitChildren = [
        ...headerWith2NumbersBold(["IN THE COURT OF THE «district»", `I.A.No.${tabSpace(3)}OF «myear»`, 'IN', `O.P.No.${tabSpace(3)}OF «myear»`]),
        ...BetweenSection(fData, "..Petitioner/Petitioner", "..Respondent/Respondent"),
        h3underlineBoldCenter("AFFIDAVIT"),
        ...addParagraphs([
            `${tabSpace(1)}I, «interim_prayer», do hereby solemnly and sincerely affirm and sincerely state on oath as follows:`,
            `1.${tabSpace(1)}I am the Petitioner herein and as such I am well acquainted with the facts of the case.`,
            "2.I submit that the aforesaid OP is filed seeking ad-interim injunction restraining the respondents from alienating or encumbering the petition schedule properties.",
            `${tabSpace(1)}It is therefore prayed that this Hon'ble Court may be pleased to grant exparte ad-interim injunction restraining the respondents, their men, assignees, agents and persons claiming through them from interfering with the peaceful possession and enjoyment of the suit scheduled property till disposal of the suit and such other reliefs as this Hon’ble Court may deem fit and proper in the circumstances of the suit.`
        ]),
        createSignatureFooter([`Date: «fdate»`], ["DEPONENT"]),
        ...addParagraphs(["     Solemnly affirmed and sworn before me that the contents of the affidavit are true and correct to the best of my knowledge and belief, hence verified on this the «fdate» at «station»"]),
        createSignatureFooter(["IDENTIFIED BY", "«counsel_code1»", "Advocate"], ["ATTESTED BY:", "Advocate :: «station»"]),
    ];

    // --- 3. INJUNCTION I.A. PETITION SECTION ---
    const injunctionPetitionChildren = [
        ...headerWith2NumbersBoldUnderline(["IN THE COURT OF THE «district»", "I.A.No.                 OF «myear»", 'IN', "O.P.No.                 OF «myear»"]),
        ...BetweenSection(fData, "..Petitioner/Petitioner", "..Respondent/Respondent"),
        h3underlineBoldCenter("PETITION FILED UNDER ORDER 39, RULE-1&2,"),
        h3underlineBoldCenter("R/W.SEC.151 OF C.P.C."),
        ...LineSpace(2),
        ...addParagraphs([`${tabSpace(1)}For the reasons stated in the accompanying affidavit, the petitioner herein pray that this Hon'ble Court may be pleased to grant exparte ad-interim injunction restraining the respondents, their men, assignees, agents and persons claiming through them from interfering with the peaceful possession and enjoyment of the suit scheduled property till disposal of the suit and such other reliefs as this Hon’ble Court may deem fit and proper in the circumstances of the suit.`]),
        h3underlineBoldCenter("SCHEDULE OF PROPERTY"),
        ...LineSpace(2),
        ...addParagraphs([`${tabSpace(1)}All that part and parcel of land bearing Survey No.__, admeasuring ______ out of the total extent of Ac._____ gts in ________ Village, __________ District bounded by:`]),
        ...listWithColon(["NORTH", "SOUTH", "EAST", "WEST"]),
        ...LineSpace(1),
        createSignatureFooter(["Date: «fdate»", "«station»"], ["Counsel for Petitioner"]),
        pageBreak(),
        createRightAlignPage(secondCoverLines),

        pageBreak(),

        h3Center("Form No.2"),
        h2Center("SUMMONS FOR SETTLEMENT OF ISSUES"),
        h3Center("(Order V Rules 3 & 5)"),
        ...headerWith1NumberUnderlineBold(["IN THE COURT OF THE «district»", `O.P.No.${tabSpace(3)}OF «myear»`]),
        ...BetweenSection(fData, "...Petitioner", "...Respondent"),
        h3Left("To"),
        ...LineSpace(1),
        h3Left("«RESPONDENT_ADDRESS»"),
        ...addParagraphs([
            "Whereas the Petitioner has instituted as OP against you, you are hereby summoned to appear in this court in person or by a pleader duly instructed and able to answer all material questions relating to the suit or who shall be accompanied by some person able to answer all such questions on the _______ day of _____ «myear» at 10-30 O' clock in the forenoon to answer the claim, and further you are hereby directed to file within 30 days of service of this summon a written statement of your defense and to produce on the said day all documents in your possession or power upon which you base your defense.",
            `${tabSpace(1)}Take notice that in default of your appearance and to file your written statement within 30 days the suit will be heard and determined in your absence.`,
            `${tabSpace(1)}Given under my hand seal of the court this __________ day of «myear»`
        ]),
        h3Right("NAZIR"),
        ...LineSpace(1),
        headerList("Notice:", [
            "1. Should you appeared your witness will not attend on their own accord you can have summons from this court to compel the attendance of any witness and production of any document that you have a right to call upon the witness to produce on applying to the court and an depositing the necessary expenses.",
            "2.If you admit the claim you should pay the money into court together with cost of the suit to avoid execution of the decree, which may be against your person or property or both."
        ]),
    ];

    // --- 4. OUT OF ORDER I.A. AFFIDAVIT SECTION ---
    const outOfOrderAffidavitChildren = [
        createParagraph("IN THE COURT OF THE «district»", paragraphStyles.centerText),
        createParagraph("I.A.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph('IN', paragraphStyles.centerTextSmall),
        createParagraph("O.P.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph("BETWEEN:", paragraphStyles.centerTextSmall),

        // [cite_start]// Use BetweenSection for petitioner/respondent names [cite: 402, 405]
        ...BetweenSection(fData, "...Petitioner", "...Respondent"),

        createParagraph("AFFIDAVIT", paragraphStyles.underlinedHeading),
        createParagraph("I, «interim_prayer», do hereby solemnly and sincerely affirm and sincerely state on oath as follows:", paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        createParagraph("1.   I am the Petitioner herein and as such I am well acquainted with the facts of the case.", paragraphStyles.paraText),
        createParagraph("2.   I submit that I have filed a petition for only out of order.", paragraphStyles.paraText),
        createParagraph("3.   The matter is urgent, therefore, the Hon’ble Court may be pleased to check and register the suit and IA as out of order today only.", paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        // Deponent Footer
        new Table({
            rows: [
                new TableRow({
                    children: [
                        createParagraph("Date: «fdate»", paragraphStyles.leftAlignSmall),
                        createParagraph("Deponent", paragraphStyles.rightAlignText),
                    ],
                }),
                new TableRow({
                    children: [
                        createParagraph("«station»", paragraphStyles.leftAlignSmall),
                        createParagraph("", paragraphStyles.rightAlignText),
                    ],
                }),
            ],
        }),
        createParagraph("The contents of this Affidavit was read over and explained to deponent in TELUGU/HINDI/URDU who after having perfectly understood the same solemnly affirmed to be true and correct hence sworn and signed before me this day on «fdate»", paragraphStyles.leftAlignSmall),

        // Attestation Table
        new Table({
            rows: [
                new TableRow({
                    children: [
                        createParagraph("IDENTIFIED BY", paragraphStyles.leftAlignText),
                        createParagraph("ATTESTED BY:", paragraphStyles.rightAlignText),
                    ],
                }),
                new TableRow({
                    children: [
                        createParagraph("«counsel_code1»", paragraphStyles.leftAlignText),
                        createParagraph("Advocate :: «station»", paragraphStyles.rightAlignText),
                    ],
                }),
                new TableRow({
                    children: [
                        createParagraph("Advocate", paragraphStyles.leftAlignText),
                        createParagraph("", paragraphStyles.rightAlignText),
                    ],
                }),
            ],
        }),
    ];

    // --- 5. OUT OF ORDER I.A. PETITION SECTION ---
    const outOfOrderPetitionChildren = [
        createParagraph("IN THE COURT OF THE «district»", paragraphStyles.centerText),
        createParagraph("I.A.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph('IN', paragraphStyles.centerTextSmall),
        createParagraph("O.P.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph("BETWEEN:", paragraphStyles.centerTextSmall),

        // [cite_start]// Use BetweenSection for petitioner/respondent addresses [cite: 423, 426]
        ...BetweenSection(fData, "..Petitioner", "..Respondent"),

        createParagraph("OUT OF ORDER PETITION FILED UNDER RULE-57 C.R.P.", paragraphStyles.underlinedTextSmall),
        createParagraph("R/W.SEC.151 OF C.P.C.", paragraphStyles.underlinedTextSmall),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        createParagraph("For the reasons stated in the accompanying affidavit annexed herewith, the petitioner herein pray that this Hon'ble Court may be pleased to direct the section to check the petition and put up as OUT OF ORDER on bench today only.", paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpace),

        // Counsel Footer
        getCounselPetitionerFooter("Counsel for Petitioner"),
    ];

    // --- 6. VAKALATNAMA SECTION ---
    const vakalatChildren = [
        createParagraph("IN THE COURT OF THE  «district»", paragraphStyles.centerText),
        createParagraph("O.P.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph("BETWEEN:", paragraphStyles.centerTextSmall),

        // [cite_start]// Use BetweenSection for petitioner/respondent names [cite: 455, 458]
        ...BetweenSection(fData, "….  PETITIONER", "…..RESPONDENT"),

        createParagraph("VAKALAT", paragraphStyles.underlinedHeading),
        createParagraph("I, «interim_prayer», do hereby appoint and retain «counsel_code1» Advocate Advocate/s to appear for me/us in the above Suit/Appeal/Petition/Case and to conduct and prosecute or defend the same and all proceedings that may be taken in respect of any application for execution of any decree or order passed therein. I/We empower my/our Advocate/s to appear in all miscellaneous proceedings in the above suit or matter till all decrees or order are fully satisfied, or adjusted, to compromise and obtain the return of documents and draw any money that might be payable to me/us in the said suit or matter and I/We do further empower my/our Advocate/s to accept on my/our behalf service of notice of all or any appeal or petition filed in any court or appeal Reference or Revision with regard to the said suit or matter before disposal of the same in Honourable Court. I certified that the executant who is well acquainted with English, read this Vakalatnama that the contents of this Vakalatnama were read out and explained in Urdu/Hindi/Telugu to the executant he/she/they being unacquainted with English, who appeared perfectly to understand the same and signed or put his/her/their name or mark in my presence.", paragraphStyles.paraText),

        new Table({
            rows: [
                new TableRow({
                    children: [
                        createParagraph("Identified by Sri _______________________________", paragraphStyles.leftAlignText),
                        createParagraph("ADVOCATE", paragraphStyles.rightAlignText),
                    ],
                }),
                new TableRow({
                    children: [
                        createParagraph("Executed  on «fdate»", paragraphStyles.leftAlignText),
                        createParagraph("", paragraphStyles.rightAlignText),
                    ],
                }),
            ],
        }),

        // Vakalat Accepted (Cover)
        createParagraph("", { children: [new PageBreak()] }),
        createParagraph("IN THE COURT OF THE  «district»", paragraphStyles.centerText),
        createParagraph("O.P.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph("BETWEEN:", paragraphStyles.centerTextSmall),
        // [cite_start]// Use BetweenSection for petitioner/respondent names [cite: 472, 475]
        ...BetweenSection(fData, "….PETITIONER", "RESPONDENT"),
        createParagraph("VAKALAT", paragraphStyles.underlinedHeading),
        createParagraph("ACCEPTED", paragraphStyles.centerTextBig),
        createParagraph("", paragraphStyles.emptySpace),
        createParagraph("FILED ON: «fdate»", paragraphStyles.centerText),
        createParagraph("FILED BY:", paragraphStyles.leftAlignSmall),
        createParagraph("M/s «counsel_address1» Advocate", paragraphStyles.leftAlignSmall),
        createParagraph("ADVOCATE FOR PETITIONER", paragraphStyles.rightAlignSmall),
    ];

    // --- 7. SUMMONS (Form No.2) SECTION ---
    const summonsChildren = [
        createParagraph("Form No.2", paragraphStyles.leftAlignSmall),
        createParagraph("SUMMONS FOR SETTLEMENT OF ISSUES", paragraphStyles.centerTextBig),
        createParagraph("(Order V Rules 3 & 5)", paragraphStyles.centerTextSmall),
        createParagraph("IN THE COURT OF THE «district»", paragraphStyles.centerText),
        createParagraph("O.P.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph("Between:", paragraphStyles.centerTextSmall),

        // [cite_start]// Use BetweenSection for petitioner/respondent names [cite: 350, 353]
        ...BetweenSection(fData, "...Petitioner", "...Respondent"),

        createParagraph("To", paragraphStyles.leftAlignText),
        createParagraph("«RESPONDENT_ADDRESS»", paragraphStyles.leftAlignText),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        createParagraph("Whereas the Petitioner has instituted as OP against you, you are hereby summoned to appear in this court in person or by a pleader duly instructed and able to answer all material questions relating to the suit or who shall be accompanied by some person able to answer all such questions on the _______ day of _____ «myear» at 10-30 O' clock in the forenoon to answer the claim, and further you are hereby directed to file within 30 days of service of this summon a written statement of your defense and to produce on the said day all documents in your possession or power upon which you base your defense. Take notice that in default of your appearance and to file your written statement within 30 days the suit will be heard and determined in your absence.", paragraphStyles.paraText),
        createParagraph("", paragraphStyles.emptySpaceSmall),

        new Table({
            rows: [
                new TableRow({
                    children: [
                        createParagraph("Given under my hand seal of the court this __________ day of «myear»", paragraphStyles.leftAlignText),
                        createParagraph("NAZIR", paragraphStyles.rightAlignText),
                    ],
                }),
            ],
        }),
        createParagraph("", paragraphStyles.emptySpace),

        createParagraph("NOTICE:   1. Should you appeared your witness will not attend on their own accord you can have summons from this court to compel the attendance of any witness and production of any document that you have a right to call upon the witness to produce on applying to the court and an depositing the necessary expenses. 2.If you admit the claim you should pay the money into court together with cost of the suit to avoid execution of the decree, which may be against your person or property or both.", paragraphStyles.paraText),
    ];

    // --- 8. COVER PAGE (OP) SECTION ---
    const coverChildren = [
        createParagraph("IN THE COURT OF THE", paragraphStyles.underlinedTextSmall),
        createParagraph("«district»", paragraphStyles.underlinedText),
        createParagraph("O.P.No.                 OF «myear»", paragraphStyles.centerTextSmall),
        createParagraph("BETWEEN:", paragraphStyles.centerTextSmall),

        // [cite_start]// Use BetweenSection for petitioner/respondent names [cite: 275, 278]
        ...BetweenSection(fData, "..Petitioner", "..Respondent /s"),

        createParagraph("PETITION FILED UNDER SEC.9 OF ARBITRATION & CONCILIATION ACT, 1996", paragraphStyles.underlinedTextSmall),

        createParagraph("", paragraphStyles.emptySpace),
        createParagraph("FILED ON: «fdate»", paragraphStyles.centerText),
        createParagraph("", paragraphStyles.emptySpace),
        createParagraph("FILED BY:", paragraphStyles.leftAlignSmall),
        createParagraph("M/s «counsel_address1»", paragraphStyles.leftAlignSmall),
        createParagraph("COUNSEL FOR PETITIONER", paragraphStyles.rightAlignSmall)
    ];


    // --- FINAL DOCUMENT ASSEMBLY ---
    return new Document({
        sections: [
            // 1. Main OP (Starts on Page 1)
            { properties: {}, children: mainOPChildren },

            // 2. Injunction Affidavit (Starts on new page/section)
            { properties: { pageBreakBefore: true }, children: injunctionAffidavitChildren },

            // 3. Injunction Petition (Starts on new page/section)
            { properties: { pageBreakBefore: true }, children: injunctionPetitionChildren },

            // 4. Out of Order Affidavit (Starts on new page/section)
            { properties: { pageBreakBefore: true }, children: outOfOrderAffidavitChildren },

            // 5. Out of Order Petition (Starts on new page/section)
            { properties: { pageBreakBefore: true }, children: outOfOrderPetitionChildren },

            // 6. Vakalatnama (Starts on new page/section)
            { properties: { pageBreakBefore: true }, children: vakalatChildren },

            // 7. Summons Form (Starts on new page/section)
            { properties: { pageBreakBefore: true }, children: summonsChildren },

            // 8. Cover Page (Last Section)
            createDocxCoverSection(coverChildren, 6780),
        ],
    });
};