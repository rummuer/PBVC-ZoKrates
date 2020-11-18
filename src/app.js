App={
	contracts: {},
	load: async () => {
        console.log("I am here");
        await App.loadWeb3() // talk to BC using web3
        await App.loadAccount()
        await App.loadContract()
            },

            loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({ /* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },
    loadAccount: async () => {
        App.account = web3.eth.accounts[0]
       // App.uBal = web3.eth.accounts[0].balance;
    },
    loadContract: async () => {
        const VC = await $.getJSON('Verifier.json')
        App.contracts.VC = TruffleContract(VC)
        App.contracts.VC.setProvider(App.web3Provider)
        App.VC = await App.contracts.VC.deployed()
    },
    VerifyingKey: async() =>{
    	const a = await App.VC.sayHello();
    	console.log(a);
    },
    VerifyTX: async() =>{
    	var a = ["0x206b8a68a67a587ca21c0a31a071669835566dd10676059e8533d5605f96a518", "0x142b6e2831e5c60bd4eb3cf227c13409e490197a76d3b284fc0b85117154b1fb"]
    	var b = [["0x260feb1f5067829e619699e4a36dac919e63ae8b6cc24323f0ba84795cb404d8", "0x29d768192148d1dbe4557a4716070b162fc9ae35e9a926190906ac033ab4a550"], ["0x15a61cb508491e7e084e3c05c093ea872b0e27d12f92d22a0cb86d01ecc8bffb", "0x08d76f37f87626acfc85565b810aab9e4ffbf4b2e13cf82a9d1d8707bc7cb4ad"]]
    	var c =  ["0x1832e995ee1773aa66fee2f8ff1068a951a07c74adb380ef795004c91feea1de", "0x1b1ad4613469c2b785c4ae07177d39d3c6dad7930e8dba2007a2760d3506e4e2"]
    	var input = [1,2,3,4,5,6,7,8,9,10,3,1]

    	const txreceipt = await App.VC.verifyTx(a,b,c,input)
    	console.log(txreceipt);

    },
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})
