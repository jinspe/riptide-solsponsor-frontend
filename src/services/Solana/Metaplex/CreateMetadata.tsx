import * as metadt from './MetadataTypes';

export default function CreateMetadata(
  minterPk: string,
  creatorPk: string,
  creatorDisplayName: string,
  tierTitle: string,
  imageUrl: string,
  transactionList: string[]
): metadt.MetadataJson {
  let creatorsList: metadt.MetadataJsonCreator[] = [
    {
      address: creatorPk,
      verified: false,
      share: 80,
    },
    {
      address: minterPk,
      verified: true,
      share: 20,
    },
  ];
  if (creatorPk === minterPk) {
    creatorsList = [
      {
        address: creatorPk,
        verified: false,
        share: 100,
      },
    ];
  }

  const files: metadt.MetadataJsonFile[] = [
    {
      uri: imageUrl,
      type: 'image/png',
    },
  ];

  const metaProperties: metadt.MetadataJsonProperties = {
    files, // MetadataJsonFile[];
    category: 'image', // MetaDataJsonCategory;
    creators: creatorsList, // MetadataJsonCreator[];
  };

  // map transaction
  const attributes: metadt.MetadataJsonAttribute[] = [];
  transactionList.forEach((el, index) => {
    attributes.push({
      trait_type: `transaction-${index}`,
      value: el,
    });
  });

  const metaCollection: metadt.MetadataJsonCollection = {
    name: 'solsponsor',
    family: 'Sponsor',
  };

  const metadataTest: metadt.MetadataJson = {
    name: tierTitle.slice(0, 30),
    symbol: 'solsponsor',
    description: `Membership to ${creatorDisplayName}`,
    seller_fee_basis_points: 690,
    image: imageUrl,
    external_url: 'https://solsponsor.com',
    attributes, // MetadataJsonAttribute[];
    collection: metaCollection, // MetadataJsonCollection;
    properties: metaProperties, // MetadataJsonProperties;
  };

  return metadataTest;
}
