// index.js

const Web3 = require('web3');

class Web3Tools {
    constructor(providerUrl, timeout = 10000) {
        this._web3 = new Web3(providerUrl, { timeout });
    }

    grabBlockInfo(blockNumber) {
        return new Promise((resolve, reject) => {
            this._web3.eth.getBlock(blockNumber)
                .then(block => resolve(block))
                .catch(error => {
                    console.error('Error fetching block details:', error);
                    reject(error);
                });
        });
    }

    grabTransactionReceipt(txHash) {
        return new Promise((resolve, reject) => {
            this._web3.eth.getTransactionReceipt(txHash)
                .then(receipt => resolve(receipt))
                .catch(error => {
                    console.error('Error fetching transaction receipt:', error);
                    reject(error);
                });
        });
    }

    calculateGas(txObject) {
        return new Promise((resolve, reject) => {
            this._web3.eth.estimateGas(txObject)
                .then(gas => resolve(gas))
                .catch(error => {
                    console.error('Error estimating gas usage:', error);
                    reject(error);
                });
        });
    }

    deploySmartContract(abi, bytecode, from, gas) {
        return new Promise((resolve, reject) => {
            const contract = new this._web3.eth.Contract(abi);
            const deployment = contract.deploy({ data: bytecode });
            deployment.send({ from, gas })
                .then(deployedContract => resolve(deployedContract))
                .catch(error => {
                    console.error('Error deploying contract:', error);
                    reject(error);
                });
        });
    }

    getGasPrice() {
        return new Promise((resolve, reject) => {
            this._web3.eth.getGasPrice()
                .then(gasPrice => resolve(gasPrice))
                .catch(error => {
                    console.error('Error fetching current gas price:', error);
                    reject(error);
                });
        });
    }

    identifyNetwork() {
        return new Promise((resolve, reject) => {
            this._web3.eth.net.getId()
                .then(networkId => resolve(networkId))
                .catch(error => {
                    console.error('Error fetching network ID:', error);
                    reject(error);
                });
        });
    }

    listAccounts() {
        return new Promise((resolve, reject) => {
            this._web3.eth.getAccounts()
                .then(accounts => resolve(accounts))
                .catch(error => {
                    console.error('Error fetching accounts:', error);
                    reject(error);
                });
        });
    }
}

module.exports = Web3Tools;
