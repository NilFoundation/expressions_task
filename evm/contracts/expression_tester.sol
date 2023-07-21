// SPDX-License-Identifier: Apache-2.0.
//---------------------------------------------------------------------------//
// Copyright (c) 2023 Elena Tatuzova <e.tatuzova@nil.foundation>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//---------------------------------------------------------------------------//

pragma solidity >=0.8.4;

import "./interfaces/evaluator.sol";
import "hardhat/console.sol";

contract ExpressionTester {
    function execute_and_check(
        uint256[] calldata vars,
        uint256 correct_hash,
        address evaluator_addr
    ) external view returns (bool){    
        uint256 gas = gasleft();

        IEvaluator evaluator_component = IEvaluator(evaluator_addr);
        uint256 result = evaluator_component.evaluate(vars);
        console.log(gas - gasleft());
        bytes32 real_hash = keccak256(abi.encodePacked(result));
        if( bytes32(correct_hash) == real_hash ) {
            return true;
        }
        else {
            console.log(uint256(real_hash));
            return false;
        }
    }

    function execute(
        uint256[] calldata vars,
        address evaluator_addr
    ) external view returns (uint256){    
        uint256 gas = gasleft();

        IEvaluator evaluator_component = IEvaluator(evaluator_addr);
        uint256 result = evaluator_component.evaluate(vars);
        console.log(gas - gasleft());
        return result;
    }
}