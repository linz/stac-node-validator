# stac-node-validator

Simple proof-of-concept to validate STAC Items, Catalogs, Collections and core extensions with node.

## Versions

**Current version: 0.3.0**

| STAC Node Validator Version | Supported STAC Versions |
| --------------------------- | ----------------------- |
| >= 0.4.0                    | >= 1.0.0-beta.2         |
| 0.3.0                       | 1.0.0-beta.2            |
| 0.2.1                       | 1.0.0-beta.1            |

## Setup

1. Install [node and npm](https://nodejs.org) - should run with any recent version
2. `npm install -g stac-node-validator` to install the library

## Usage

- Validate a single file: `stac-node-validator /path/to/your/file.json`
- Validate multiple files: `stac-node-validator /path/to/your/catalog.json /path/to/your/item.json`

Instead of paths to local files, you can also use HTTP(S) URLs. Other protocols such as S3 are not supported yet.

- Validate a single folder (considers all `json` files in `examples` folders): `stac-node-validator ./stac-spec`

Further options to add to the commands above:

- To validate against schemas in a local STAC folder (e.g. `dev` branch): `--schemas /path/to/stac/folder`

### Development

1. `git clone https://github.com/m-mohr/stac-node-validator` to clone the repo
2. `cd stac-node-validator` to switch into the new folder created by git
3. `npm install` to install dependencies
4. Run the commands as above, but replace `stac-node-validator` with `node bin/cli.js`, for example `node bin/cli.js /path/to/your/file.json`