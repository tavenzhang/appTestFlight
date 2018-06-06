'use-strict';
import {observable, action, computed, autorun} from "mobx";

import balanceStore from "./BalanceStore";


class RootStore {

    constructor() {
        this.balanceStore = balanceStore;
    }
}

const rootStore = new RootStore()

export default rootStore


