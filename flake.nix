{
  description = "Master or machine";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        name = "master-or-machine";

        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs
            pkgs.apache-jena-fuseki
          ];
          shellHook = ''
            export PATH=$PATH:$PWD/node_modules/.bin
            npm install
          '';
        };

        formatter = pkgs.nixfmt-rfc-style;
      }
    );
}
