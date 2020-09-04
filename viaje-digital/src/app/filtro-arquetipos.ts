//filtros
export const FILTROS: any = {
    "Anaesthesia and ventilation":
    {
        "cluster": [
            "Ventilator settings/findings"
        ]
    },

    "Anthropometry":
    {
        "observation": [
            "Body composition",
            "Body segment area",
            "Body segment circumference",
            "Body segment length",
            "Chest circumference",
            "Head circumference",
            "Hip circumference",
            "Skeletal age",
            "Testicular volume",
            "Waist circumference",
            "Waist-height ratio",
        ]
    },

    "Cancer reporting":
    {
        "cluster": [
            "TNM clinical classification"
        ],
        "observation": [
            "ECOG performance status"
        ]

    },

    "COVID-19 incubator":
    {
        "cluster": [
            "Address",
            "Anonymised person (PARENT)",
            "Healthcare worker",
            "Location-based exposure",
            "Occupation record",
            "Organisation",
            "Symptom/Sign"//No va aparecer
        ],
        "composition": [
            "Encounter",//No va aparecer
            "Report"//No va aparecer
        ],
        "action": [
            "Procedure",
            "Service"
        ],
        "evaluation": [
            "Condition summary",
            "COVID - procedure summary",
            "Covid-19 infection risk assessment",
            "Occupation summary",
            "Pregnancy Summary",
            "Problem/Diagnosis",
            "Reason for encounter"
        ],
        "observation": [
            "Laboratory test result",
            "Travel trip history"
        ],
        "admin_entry": [
            "Covid 19 Admission",
            "COVID outcomes",
            "Patient admission"
        ]
    },
    "COVID-19 project":
    {
        "cluster": [
            "Dwelling",
            "Overcrowding screening"
        ],
        "evaluation": [
            "Health risk assessment",
            "Infectious exposure investigation",
            "Living arrangement"
        ],
        "observation": [
            "Condition screening questionnaire",
            "CRB-65 score",
            "CURB-65 score",
            "Exposure screening questionnaire",
            "HScore",
            "Management/treatment screening questionnaire",
            "Murray score",
            "PaO2/FiO2 ratio",
            "Procedure screening questionnaire",
            "Symptom/sign screening questionnaire",
            "Travel event"
        ],
        "admin_entry": [
            "Episode of care - institution",
            "Transfer of care"
        ]
    },
    "Dentistry Incubator":
    {
        "cluster": [
            "Anatomical location gingiva",
            "Anatomical location tooth",
            "Examination of a tooth",
            "Examination of dentition",
            "Examination of giginvae",
            "Examination of occlusal",
            "Examination of oral membrane",
            "Examination of teeth"

        ],
        "observation": [
            "Exam oral",
            "Periodontal screening and recording"
        ]
    },
    "Fluid balance":
    {
        "observation": [
            "Faecal output",
            "Fluid balance",
            "Fluid input",
            "Fluid output"
        ]
    },
    "Genomics":
    {
        "cluster": [
            "Citation",
            "Genetic copy number variant",
            "Genetic deletion variant",
            "Genetic deletion-insertion variant",
            "Genetic duplication variant",
            "Genetic repeated sequence variant",
            "Genetic substitution variant",
            "Genetic translocation variant",
            "Genetic variant - Inversion",
            "Genetic variant presence",
            "Genomic variant result",
            "Insertion variant",
            "Knowledge base reference",
            "Medical device",
            "Reference sequence",
            "Sequencing assay",
        ],
        "observation": [
            "Laboratory test result"
        ]
    },
    "Health Assessment scores": {
        "observation": [
            "EQ-5D-5L Health status"
        ]
    },
    "Hearing":
    {
        "cluster": [
            "Examination of a middle ear",
            "Examination of a tympanic membrane",
            "Examination of an ear",
            "Examination of an external auditory canal",
            "Examination of both ears",
        ],
        "observation": [
            "Acoustic reflex test result",
            "Audiogram test result",
            "Audiology speech test result",
            "Auditory brainstem response (ABR) result",
            "Behavioural observation audiometry (BOA) result",
            "Hearing screening test result",
            "Rinne and Weber test results",
            "Tympanogram test result - 226Hz",
            "Tympanogram test result - high frequency",
        ]
    },
    "Laboratory and pathology testing":
    {
        "cluster": [
            "Anatomical pathology examination",
            "Laboratory analyte result",
            "Laboratory test panel",
            "Specimen",
            "Specimen container",
            "Specimen transport details",
        ],
        "observation": [
            "Laboratory test result"
        ]
    },
    "Lifestyle factors":
    {
        "evaluation": [
            "Alcohol consumption summary",
            "Gambling summary",
            "Physical activity summary",
            "Sexual health summary",
            "Smokeless tobacco summary",
            "Tobacco smoking summary"
        ],
        "observation": [
            "Alcohol intake",
            "Alcohol Use Disorders Identification Test (AUDIT)",
            "Physical activity"
        ]
    },
    "Medication family of archetypes":
    {
        "cluster": [
            "Conditional medication instructions",
            "Dosage",
            "Medication",
            "Medication authorisation",
            "Medication order summary",
            "Medication supply amount",
            "Therapeutic direction",
            "Timing - daily",
            "Timing - non-daily"
        ],
        "composition": [
            "Medication list",
            "Prescription"

        ],
        "action": [
            "Medication management"
        ],
        "evaluation": [
            "Medication summary"
        ],
        "observation": [
            "Medication screening questionnaire"
        ],
        "instruction": [
            "Medication order"
        ],
        "section": [
            "Medication Order List"
        ]
    },
    "Multiple Sclerosis Functional Composite (MSFC)": {
        "observation": [
            "MSFC score",
            "Nine Hole Peg Test",
            "Paced Auditory Serial Addition Test",
            "Timed 25-Foot Walk"
        ]
    },

    "Nutrition":
    {
        "cluster": [
            "Dietary nutrients",
            "Dietary phytochemicals",
            "Macronutrients",
            "Micronutrients"
        ],
        "observation": [
            "Eating disorder screening (SCOFF)",
            "Food item",
            "Malnutrition screening tool (MST)",
            "Malnutrition Universal Screening Tool (MUST)",
            "Nutrition intake",
            "Nutritional Risk Screening (NRS 2002)"
        ]
    },
    "Obstetrics/Gynaecology":
    {
        "cluster": [
            "Inspection of the cervix",
            "Palpation of a fetus (per abdomen)",
            "Palpation of a fetus (per vagina)",
            "Palpation of the cervix",
            "Palpation of the uterus",
        ],
        "composition": [
            "Pregnancy Summary"
        ],
        "evaluation": [
            "Estimated date of delivery",
            "Menstruation summary",
            "Obstetric summary",
            "Pregnancy Summary",
            "Pregnancy/breast feeding status"
        ],
        "observation": [
            "Apgar score",
            "Bishop score",
            "Fetal heart rate",
            "Fetal Movement",
            "Fluid output",
            "Gestation",
            "Malinas score",
            "Menstruation",
            "Pregnancy status",
            "Pregnancy test result",
            "Uterine contractions"
        ]
    },
    "Oedema":
    {
        "cluster": [
            "Oedema"
        ]
    },

    "Operative notes":
    {
        "cluster": [
            "Medical device",
            "Specimen"
        ],
        "composition": [
            "Procedure report"
        ],
        "action": [
            "Imaging examination",
            "Procedure",
            "Transfusion"
        ],
        "observation": [
            "Imaging examination result"
        ]
    },

    "Operative Procedures":
    {
        "cluster": [
            "Operative procedure",
            "Physiological monitoring",
            "Procedure preparation"
        ]
    },
    "Ophthalmology":
    {
        "cluster": [
            "Refraction Details"
        ],
        "observation": [
            "Intraocular pressure test result",
            "Physical examination findings",
            "Refraction assessment",
            "Visual acuity test result",
            "Visual field measurement",
        ]
    },
    "Pathology Synoptic reporting":
    {
        "cluster": [
            "Lymph node metastases",
            "Macroscopic findings - Colorectal cancer",
            "Microscopic findings - Breast cancer",
            "Microscopic findings - Colorectal cancer",
            "Microscopic findings - Lymphoma",
            "Microscopic findings - Melanoma of skin",
            "Microscopic findings - Prostate cancer",
            "Surgical resection margins",
            "Tumour - direct invasion"

        ]
    },
    "Phenopacket demonstrator":
    {
        "cluster": [
            "Phenopacket biosample",
            "Phenopacket diagnosis",
            "Phenopacket disease",
            "Phenopacket evidence",
            "Phenopacket external reference",
            "Phenopacket family framework",
            "Phenopacket framework",
            "Phenopacket gene",
            "Phenopacket genomic interpretation",
            "Phenopacket HgvsAllele",
            "Phenopacket HtsFile",
            "Phenopacket IscnAllele",
            "Phenopacket MetaData",
            "Phenopacket phenotypic feature",
            "Phenopacket procedure",
            "Phenopacket resource",
            "Phenopacket SpdiAllele",
            "Phenopacket update",
            "Phenopacket variant",
            "Phenopacket VcfAllele",
            "Phenopackets pedigree",
            "Phenopackets person",

        ],
        "evaluation": [
            "Phenopacket cohort",
            "Phenopacket interpretation"
        ]

    },
    "Physical Examination findings":
    {
        "cluster": [
            "Examination findings",
            "Examination of a burn",
            "Examination of a lesion",
            "Examination of deep tendon reflexes",
            "Examination of faeces",
            "Exclusion of examination",
            "Gait",
            "Inspection of a body fluid",
            "Inspection of the cervix",
            "Inspection of the rectum",
            "Inspection of the vagina",
            "Oedema",
            "Palpation of a fetus (per abdomen)",
            "Palpation of a fetus (per vagina)",
            "Palpation of the cervix",
            "Palpation of the prostate",
            "Palpation of the rectum",
            "Palpation of the uterus",
            "Palpation of the vagina",
            "Skin sensation"

        ],
        "observation": [
            "Physical examination findings"
        ]
    },
    "Problem/Diagnosis family of archetypes":
    {
        "cluster": [
            "Problem/Diagnosis qualifier"
        ],
        "composition": [
            "Problem list"
        ],
        "evaluation": [
            "Problem/Diagnosis"
        ]

    },
    "PRSB Section headings":
    {
        "section": [
            "Clinical Risk Factors",
            "Examination findings",
            "History",
            "Plan and requested actions"
        ]
    },
    "RCPA Cancer reporting protocols":
    {
        "section": [
            "Lab report",
            "Lab result details",

        ]
    },
    "Scores and Scales":
    {
        "observation": [
            "ABC-stroke risk score",
            "ABCD2 score",
            "ACVPU scale",
            "Alvarado score",
            "Ankle Osteoarthritis Score",
            "AOFAS Score",
            "Appendicitis Inflammatory Response (AIR) Score",
            "Braden scale",
            "CAGE questionnaire",
            "Child-Pugh score",
            "Clinical Frailty Scale (CFS)",
            "CRB-65 score",
            "CRUSADE bleeding score",
            "CURB-65 score",
            "Edmonton Symptom Assessment System Revised (ESAS-r)",
            "EORTC QLQ-C30",
            "EORTC QLQ-CR29",
            "FACT-G",
            "GRACE score (admission)",
            "GRACE score (discharge)",
            "HEART score",
            "HScore",
            "Modified Barthel index",
            "Modified Rankin scale",
            "MSKCC Bowel Function Instrument",
            "Murray score",
            "NEWS2 Score",
            "SOFA score"
        ]
    },

    "Screening questionnaire project":
    {
        "observation": [
            "Condition screening questionnaire",
            "Exposure screening questionnaire",
            "Management/treatment screening questionnaire",
            "Medication screening questionnaire",
            "Procedure screening questionnaire",
            "Social context screening questionnaire",
            "Symptom/sign screening questionnaire",
            "Travel event"
        ]
    },
    "Social context projec":
    {
        "cluster": [
            "Dwelling",
            "Education record",
            "Housing record",
            "Interpreter request",
            "Language",
            "Occupation record",
            "Religious affiliation"
        ],
        "evaluation": [
            "Advance care directive",
            "Communication capability",
            "Education summary",
            "Housing summary",
            "Income summary",
            "Living arrangement",
            "Occupation summary",
            "Social network",
            "Social summary"
        ],
        "admin_entry": [
            "Translation requirement"
        ]
    },
    "Social determinants of health":
    {
        "cluster": [
            "Dwelling",
            "Education record",
            "Housing record",
            "Language",
            "Macronutrients",
            "Micronutrients",
            "Occupation record",
            "Religious affiliation"
        ],
        "evaluation": [
            "Alcohol consumption summary",
            "Communication capability",
            "Education summary",
            "Exposure",
            "Food and nutrition summary",
            "Gender",
            "Health risk assessment",
            "Housing summary",
            "Immunisation summary",
            "Income summary",
            "Living arrangement",
            "Occupation summary",
            "Physical activity summary",
            "Smokeless tobacco summary",
            "Social network",
            "Social summary",
            "Substance use summary",
            "Tobacco smoking summary",


        ],
        "observation": [
            "Blood pressure",
            "Body composition",
            "Body mass index",
            "Body weight"
        ],
        "admin_entry": [
            "Translation requirement"
        ]
    },
    "Therapeutic precautions":
    {
        "evaluation": [
            "Adverse reaction risk",
            "Contraindication",
            "Precaution",
            "Pregnancy/breast feeding status"
        ]
    },
    "Vital signs":
    {
        "observation": [
            "Blood pressure",
            "Body temperature",
            "Capillary refill time",
            "Pulse oximetry",
            "Pulse/Heart beat",
            "Respiration"
        ]
    }
}