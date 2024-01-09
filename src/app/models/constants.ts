export const TEMPLATE = {
  TYPE: {
    Brand: 'brandsList',
    Technique: 'techniquesList',
    Industry: 'industryList',
    PhaseDetail: 'phaseList',
  },
  NAME: {
    Brand: 'Brand',
    Technique: 'Technique',
    Industry: 'Industry',
    PhaseDetail: 'PhaseList',
  },
  FOLDER_NAME: {
    Brand: 'Products',
    Technique: 'Techniques',
    Industry: 'Industries',
    PhaseDetail: 'PhaseDetail',
  },
};

export const TEMPLATE_PATH_QUERY = {
  brandListPath: '/sitecore/content/Sandbox/phrjss/home/Products/*',
  techniqueListPath: '/sitecore/content/Sandbox/phrjss/home/Techniques/*',
  industryListPath: '/sitecore/content/Sandbox/phrjss/home/Industries/*',
  separationModeListPath:
    '/sitecore/content/Sandbox/phrjss/Content/SeparationModes',
  documentTypeListPath:
    '/sitecore/content/Sandbox/phrjss/Content/DocumentTypes',
  questionsListPath:
    '/sitecore/content/Sandbox/phrjss/Content/Brands-questions/*',
  webinarsListPath: '/sitecore/content/Sandbox/phrjss/home/Webinars/*',
  documentsListPath: '/sitecore/content/Sandbox/phrjss/home/Documents/*',
  phaseListPath: '/sitecore/content/Sandbox/phrjss/home/Products/*',
  quickOrderTemplatePath:
    '/sitecore/content/Sandbox/phrjss/Content/Quick Order/Template',
  cqaBulkBatchTemplatePath:
    '/sitecore/content/Sandbox/phrjss/Content/CQA/Template',
};

export const FAVORITE_TYPE = {
  APPLICATION: 'Application',
  DOCUMENT: 'Document',
  PART: 'Part'
};

export const PAGE_TYPE = {
  APPLICATION: 'Applications',
  DOCUMENT: 'Documents',
  WEBINAR: 'Webinars',
  PART_NUMBER: 'Part Numbers',
  CMS_PAGES: 'Product Information',
  CMS_PAGE_TYPE: {
    BRAND: 'Brand',
    TECHNIQUE: 'Technique',
    PHASE_DETAIL: 'Phase Detail',
    INDUSTRY: 'Industry',
  },
};

export const ATTRIBUTE_NAMES = {
  "Technique": 'technique',
  "Brand": 'brand',
  "Industry": 'industry',
  "Separation Mode": 'separation_mode',
  "Document Type": 'document_type',
  "Type": 'type',
  "Phase": 'phase',
  "Compound Category": 'compound_category',
  "Pharmacological Effect": 'pharmacological_effect',
  "Compound Class": 'compound_class',
  "Particle Size (µm)": 'particle_size_mim',
  "Pore Size (Å)": 'pore_size_a',
  "Length (mm)": 'length_mm',
  "Length (m)": 'length_m',
  "Internal Diameter (mm)": 'internal_diameter_mm',
  "Official Method / Classification": 'official_method_classification',
  "Min Temp": 'min_temp',
  "Max temp": 'max_temp',
  "Particle / Sorbent Type": 'particle_sorbent_type',
  "Particle Size Range": 'particle_size_range',
  "Film Thickness (µm)": 'film_thickness_mim',
  "Composition": 'composition',
  "Accessory Type": 'accessory_type',
  "Sample Prep Type": 'sample_prep_type',
  "Vial Size": 'vial_size',
  "Vial Closure": 'vial_closure',
  "Vial Material": 'vial_material',
  "Vial Certification Level": 'vial_certification_level',
  "Sorbent Mass (mg) / Volume (mL)": 'sorbent_mass_volume',
  "Format": 'format'
};

export const PART_TYPES = [
  {
    PartType: 'HPLC',
    Attributes: [

      { AttributePattern: '[286]', AttributeNames: ['Search Category'], AttributeFacetName: 'Technique', Type: 'string' },
      { AttributePattern: '[236]', AttributeNames: ['Housing Type'], AttributeFacetName: 'Format', Type: 'string' },
      { AttributePattern: '[228]', AttributeNames: ['Isocratic pH Range'], AttributeFacetName: 'pH Range', Type: 'string' },
      { AttributePattern: '[239] [240]', AttributeNames: ['Official Agency', 'Official Classification'], AttributeFacetName: 'Official Method / Classification', Type: 'string' },
      { AttributePattern: '[279]', AttributeNames: ['Particle Size'], AttributeFacetName: 'Particle Size (µm)', Type: 'float' },
      { AttributePattern: '[215]', AttributeNames: ['Pore Size'], AttributeFacetName: 'Pore Size (Å)', Type: 'float' },
      { AttributePattern: '[238]', AttributeNames: ['Length (mm)'], AttributeFacetName: 'Length (mm)', Type: 'float' },
      { AttributePattern: '[280]', AttributeNames: ['Internal Diameter'], AttributeFacetName: 'Internal Diameter (mm)', Type: 'float' },
      { AttributePattern: '[232]', AttributeNames: ['Min Temperature (Â°C)'], AttributeFacetName: 'Min Temp', Type: 'string' },
      { AttributePattern: '[231]', AttributeNames: ['Max Temperature (Â°C)'], AttributeFacetName: 'Max temp', Type: 'string' },
      { AttributePattern: '[241] [242]', AttributeNames: ['Particle Morphology', 'Particle Type'], AttributeFacetName: 'Particle / Sorbent Type', Type: 'string' },
    ]
  }, {
    PartType: 'FLASH',
    Attributes: [{
      AttributePattern: '[286]',
      AttributeNames: ['Search Category'],
      AttributeFacetName: 'Technique',
      Type: 'string',
    },
    {
      AttributePattern: '[236]',
      AttributeNames: ['Housing Type'],
      AttributeFacetName: 'Format',
      Type: 'string',
    },
    {
      AttributePattern: '[223]',
      AttributeNames: ['Particle Size Range'],
      AttributeFacetName: 'Particle Size Range',
      Type: 'string',
    },
    {
      AttributePattern: '[215]',
      AttributeNames: ['Pore Size'],
      AttributeFacetName: 'Pore Size (Å)',
      Type: 'float',
    },
    {
      AttributePattern: '[241] [242]',
      AttributeNames: ['Particle Morphology', 'Particle Type'],
      AttributeFacetName: 'Particle / Sorbent Type',
      Type: 'string',
    },
    {
      AttributePattern: '[248]',
      AttributeNames: ['Sorbent Mass'],
      AttributeFacetName: 'Sorbent Mass',
      Type: 'float',
    },
    ],
  },
  {
    PartType: 'GC',
    Attributes: [
      { AttributePattern: '[286]', AttributeNames: ['Search Category'], AttributeFacetName: 'Technique', Type: 'string' },
      { AttributePattern: '[225]', AttributeNames: ['Length (m)'], AttributeFacetName: 'Length (m)', Type: 'float' },
      { AttributePattern: '[238]', AttributeNames: ['Length (mm)'], AttributeFacetName: 'Length (mm)', Type: 'float' },
      { AttributePattern: '[280]', AttributeNames: ['Internal Diameter'], AttributeFacetName: 'Internal Diameter (mm)', Type: 'float' },
      { AttributePattern: '[237]', AttributeNames: ['Phase Composition'], AttributeFacetName: 'Composition', Type: 'string' },
      { AttributePattern: '[232]', AttributeNames: ['Min Temperature (Â°C)'], AttributeFacetName: 'Min Temp (Â°C)', Type: 'string' },
      { AttributePattern: '[231]', AttributeNames: ['Max Temperature (Â°C)'], AttributeFacetName: 'Max temp (Â°C)', Type: 'string' },
      { AttributePattern: '[281]', AttributeNames: ['Film Thickness'], AttributeFacetName: 'Film Thickness (µm)', Type: 'float' }
    ]
  }, {

    PartType: 'SP',
    Attributes: [
      {
        AttributePattern: '[286]',
        AttributeNames: ['Search Category'],
        AttributeFacetName: 'Technique',
        Type: 'string',
      },
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[223]',
        AttributeNames: ['Particle Size Range'],
        AttributeFacetName: 'Particle Size Range',
        Type: 'string',
      },
      {
        AttributePattern: '[241] [242]',
        AttributeNames: ['Particle Morphology', 'Particle Type'],
        AttributeFacetName: 'Particle / Sorbent Type',
        Type: 'string',
      },
      {
        AttributePattern: '[248] / [234]',
        AttributeNames: ['Sorbent Mass (mg)', 'Housing Volume'],
        AttributeFacetName: 'Sorbent Mass (mg) / Volume (mL)',
        Type: 'string',
      },
      {
        AttributePattern: '[248]',
        AttributeNames: ['Sorbent Mass'],
        AttributeFacetName: 'Sorbent Mass',
        Type: 'float',
      },
      {
        AttributePattern: '[250]',
        AttributeNames: ['Accessory Category'],
        AttributeFacetName: 'Accessory Type',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'ACC',
    Attributes: [
      {
        AttributePattern: '[286]',
        AttributeNames: ['Search Category'],
        AttributeFacetName: 'Technique',
        Type: 'string',
      },
      {
        AttributePattern: '[250]',
        AttributeNames: ['Accessory Category'],
        AttributeFacetName: 'Accessory Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'VIALS',
    Attributes: [
      {
        AttributePattern: '[286]',
        AttributeNames: ['Search Category'],
        AttributeFacetName: 'Technique',
        Type: 'string',
      },
      {
        AttributePattern: '[250]',
        AttributeNames: ['Accessory Category'],
        AttributeFacetName: 'Accessory Type',
        Type: 'string',
      },
      {
        AttributePattern: '[220]',
        AttributeNames: ['Vial Dimension (mm)'],
        AttributeFacetName: 'Vial Size',
        Type: 'float',
      },
      {
        AttributePattern: '[282]',
        AttributeNames: ['Vial Closure'],
        AttributeFacetName: 'Vial Closure',
        Type: 'string',
      },
      {
        AttributePattern: '[235]',
        AttributeNames: ['Vial Material'],
        AttributeFacetName: 'Vial Material',
        Type: 'string',
      },
      {
        AttributePattern: '[253]',
        AttributeNames: ['Vial Certification Level'],
        AttributeFacetName: 'Vial Certification Level',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Affinity',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Filtration',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Simplified Liquid Extraction (SLE)',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Solid Phase Extraction (SPE)',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[241] [242]',
        AttributeNames: ['Particle Morphology', 'Particle Type'],
        AttributeFacetName: 'Particle / Sorbent Type',
        Type: 'string',
      },
      {
        AttributePattern: '[248] / [234]',
        AttributeNames: ['Sorbent Mass (mg)', 'Housing Volume'],
        AttributeFacetName: 'Sorbent Mass (mg) / Volume (mL)',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Adsorption',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Protein Precipitation (PPT)',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'QuEChERS',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Beta Glucuronidase Removal',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
  {
    PartType: 'Phospholipid Removal (PLR)',
    Attributes: [
      {
        AttributePattern: '[236]',
        AttributeNames: ['Housing Type'],
        AttributeFacetName: 'Format',
        Type: 'string',
      },
      {
        AttributePattern: '[285]',
        AttributeNames: ['Sample Prep Type'],
        AttributeFacetName: 'Sample Prep Type',
        Type: 'string',
      },
    ],
  },
];

export const LANGUAGE_LIST = [
  {
    name: 'ENG',
    id: 'en',
    displayName: 'English',
  },
  // ,
  //  {
  //     name: 'SPN', id: 'es-mx', displayName: 'español (España)'
  // }
];
export const NO_IMAGE = '/-/jssmedia/phrjss/data/media/images/phase-ligand/filler_not_available.png';
export const IGNORE_URL = [
  '/login',
  '/Registration',
  '/PersonalizeExp',
  '/RegistrationComplete',
];
export const NOT_FOUND_URL = '404';
export const SCRIPT_FILES_PATH = '/-/jssmedia/phrjss/data/media/scripts';
export const Image_Base_URL = 'https://pharma.blob.core.windows.net/cdn/Content/Images/';

export const NAM_COUNTRIES = [235]
export const CB_TYPE = {
  LEFT: "Left",
  RIGHT: "Right",
  IMAGE: "Image",
  RICHTEXT: "RichText",
}

export const CHECKOUT_ERROR_MODAL = {
  header: 'Errors in Checkout',
  subHeader: 'Please fill in or correct the following fields in order to move forward with checkout'
}

export const APPLICATION_FILTER = 'applicationFilter';

export const CCINFO_SUCCESS = '/pci/ccinfo/message';

export const CART_ROUTE = '/cart'

//Azure storage path
export const AZURE_STORAGE_PATH = 'https://phrb2c.blob.core.windows.net';

//JSDraw2 path
export const JSDRAW_PATH = '/jsdraw/Scilligence.JSDraw2.js';

//dojoxd path
export const DOJOXD_PATH = '/jsdraw/dojoxd.js';

// Checkout page route
export const CHECKOUT_ROUTES: Array<string> = ['/checkout/orderdetails','/checkout/review'];
