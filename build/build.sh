#!/bin/bash
pip install pipenv || exit 1

rm -rf ../stylesheets/inline/critical || exit 2
mkdir ../stylesheets/inline/critical || exit 3

pipenv install || exit 4

pipenv run python -m pytest || exit 5
pipenv run python test_journal_parser.py || exit 6 # show performance profiles
pipenv run python compile.py || exit 7

node build-critical-css.js || exit 8

echo '------> Rerun .journal complilation to include inline css'
pipenv run python compile.py || exit 9
