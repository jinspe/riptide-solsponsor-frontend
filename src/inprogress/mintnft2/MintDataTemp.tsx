import * as metadt from './MetadataTypes';

const creator: metadt.MetadataJsonCreator[] = [
  {
    address: 'Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv',
    verified: true,
    share: 100,
  },
];

const files: metadt.MetadataJsonFile[] = [
  {
    uri: 'https://ipfs.io/ipfs/QmcSdKMcJmkbY4J7EkNTUDbEPa6Tj2QM7tDZFATghXAU9k',
    type: 'image/png',
  },
];

const metaPrpreties: metadt.MetadataJsonProperties = {
  files, // MetadataJsonFile[];
  category: 'image', // MetaDataJsonCategory;
  creators: creator, // MetadataJsonCreator[];
};

const attributes: metadt.MetadataJsonAttribute[] = [
  {
    trait_type: 'hair',
    value: 'blue',
  },
  {
    trait_type: 'background',
    value: 'green',
  },
  /* {
    display_type: 'number',
    trait_type: 'generation',
    value: 1,
  },
  {
    display_type: 'number',
    trait_type: ' sequence',
    value: 1234,
  }, */
];

const metaCollection: metadt.MetadataJsonCollection = {
  name: 'string',
  family: 'string',
};

export const metadataTest: metadt.MetadataJson = {
  name: 'name1',
  symbol: 'string',
  description: 'string',
  seller_fee_basis_points: 690,
  image: 'https://www.yourhorse.co.uk/wp-content/uploads/image-asset.jpg',
  // animation_url: "string",
  external_url: 'https://www.yourhorse.co.uk',
  attributes, // MetadataJsonAttribute[];
  collection: metaCollection, // MetadataJsonCollection;
  properties: metaPrpreties, // MetadataJsonProperties;
};
