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

import "../../interfaces/evaluator.sol";

contract triple_summator_evaluator is IEvaluator {
    function initialize() external pure{}

    function evaluate(
        uint256[] calldata vars
    ) external pure returns (uint256 gates_evaluation){
        for(uint i = 0; i < vars.length;){
            unchecked{
                gates_evaluation += vars[i];
                i++;
            }
        }
        unchecked{
            gates_evaluation = gates_evaluation % 3;
        }
    }
}