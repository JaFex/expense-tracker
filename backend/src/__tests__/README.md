# Test Folder Structure Guidelines

## Overview
This document outlines the requirements for organizing and naming test files in our project.

## Structure
- Tests should mirror the exact folder structure of the source code
- Each test file should correspond to a source file in the same relative location

## Naming Convention
- All test files must be named with the `.test.ts` extension
- Example:
  - Source file: `src/routes/some.route.ts`
  - Test file: `tests/routes/some.route.test.ts`

## Running Tests
Run tests using the command:
```bash
npm test
```
Run tests with coverage report:
```bash
npm coverage
```