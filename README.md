# EVM Placeholder Proof System Verifier 

[![Discord](https://img.shields.io/discord/969303013749579846.svg?logo=discord&style=flat-square)](https://discord.gg/KmTAEjbmM3)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=flat-square&logo=telegram&logoColor=dark)](https://t.me/nilfoundation)
[![Twitter](https://img.shields.io/twitter/follow/nil_foundation)](https://twitter.com/nil_foundation)

Expression is formula with braces, additions, subractions, multiplication, power operation over number of variables. 
For each expression solution should generate a contract, which computes a value of expression on a different inputs in prime field with given order.

# Input

Input is placed in ``inputs`` folder. First line of input is expression. Second line is modulus.
```
(W0 + W1)
2
```
# Output

Output is Solidity contract, which calculates expression from input file.
For example, for input file ``binary_summator.txt``  output will be solidity contract named ``binary_summator_evaluator`` and placed in  ``contracts/evaluators/binary_summator`` folder.

If output contract needs any external libraries calls, enumerate used libraries names in ``linked_libs_list.json`` in the folder with contract.

Test data for each contract is placed in folder ``evm/data``. In our example it is "evm/data/binary_summator".
Test data file is JSON with fields input --- an array of variables' values for expression.
Correct answer for checking may be hidden. In this case keccak hash of correct answer will be stored in ``hash`` field.

```
{
    "input":[1, 1],
    "hash":18569430475105882587588266137607568536673111973893317399460219858819262702947
}
```
Opened correct answer may be stored in ``output`` field.
```
{
    "input":[1, 1],
    "output":0
}
```

# Who wins
Wins contracts generator with the smallest gas consumption.
Evaluator contract initialization cost in not included.

## Dependencies

- [Hardhat](https://hardhat.org/)
- [nodejs](https://nodejs.org/en/) >= 16.0


## Clone
```
git clone git@github.com:NilFoundation/expressions_task.git
cd expressions_task/evm
```

## Install dependency packages
```
npm i
```

## Compile contracts
```
npx hardhat compile
```

## Deploy

Launch a local-network using the following
```
npx hardhat deploy
```

To deploy to test environment (ex: Ganache)
```
npx hardhat deploy  --network localhost 
```
Call deployment any time you change contract.
Hardhat re-uses old deployments, to force re-deploy add the `--reset` flag above

## Test
Deploy contracts
```
npx hardhat deploy
```
Run tests
```
npx hardhat verify-all #Execute all tests
npx hardhat verify-one -- test binary_summator #Execute tests for only one chosen summator
```

## Community

Issue reports are preferred to be done with Github Issues in here: https://github.com/NilFoundation/expressions_task/issues.
Usage and development questions are preferred to be asked in Discord (https://discord.gg/KmTAEjbmM3)
Send solutions on e-mail: e.tatuzova@nil.foundation
