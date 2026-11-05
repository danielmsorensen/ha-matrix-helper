# Contributing

## Issues

Report bugs and request features in [issues](../../issues/new/choose). For bugs, include
your Home Assistant version, steps to reproduce, expected vs actual behaviour, and any
relevant logs.

## Pull requests

1. Fork the repo and branch from `main`.
2. Update the README if behaviour changes.
3. Run `scripts/lint` and the tests (`pytest`; needs POSIX, so WSL2 on Windows).
4. Open the pull request against `main`.

The card's source is in `frontend/`. Its built bundle in
`custom_components/matrix_helper/www/` is committed: rebuild it with `scripts/build-card`
and commit it with your change. CI fails if they don't match.

See the README's [Development](./README.md#development) section for all scripts.

## License

Contributions are licensed under the project's [MIT License](./LICENSE).
