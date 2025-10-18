/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_program.json`.
 */
export type SolanaProgram = {
  address: "794WyttcZeD1xWA3aXN4er2DW4JhjS48qigdmGM2cbvL";
  metadata: {
    name: "solanaProgram";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "initializeCounter";
      discriminator: [67, 89, 100, 87, 231, 172, 35, 124];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "newCounter";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [67, 111, 117, 110, 116, 101, 114];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "updateCounter";
      discriminator: [171, 200, 174, 106, 229, 34, 80, 175];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "counter";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [67, 111, 117, 110, 116, 101, 114];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "newCount";
          type: "u8";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "counter";
      discriminator: [255, 176, 4, 245, 188, 253, 124, 25];
    }
  ];
  events: [
    {
      name: "customEvent";
      discriminator: [101, 189, 94, 83, 118, 162, 97, 220];
    }
  ];
  types: [
    {
      name: "counter";
      type: {
        kind: "struct";
        fields: [
          {
            name: "count";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "customEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "message";
            type: "string";
          }
        ];
      };
    }
  ];
};
