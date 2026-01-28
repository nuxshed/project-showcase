{
  description = "A Bun development environment";

  inputs = {
    # Bun updates frequently; unstable ensures you get the latest fixes
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.bun
            # Add other tools here if needed (e.g., pkgs.nodejs, pkgs.typescript)
          ];

          shellHook = ''
            echo "🍞 Bun environment loaded!"
            bun --version
          '';
        };
      }
    );
}
