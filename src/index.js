

const canAbi = getCadaAbi();

let rpcUrl = "https://bsc-dataseed.binance.org/";
const contractAddress = "0x221afb058453b1d228bfdac3b1aab42f41e37489";


const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

const BN = web3.utils.BN;

let contract = new web3.eth.Contract(canAbi,contractAddress);

let decimalsBN = new BN(9);

let exponent = (new BN(10)).pow(decimalsBN);

async function getAccountInfo(address){
    
    //lets get the balance 
    let realBalance = getHumanReadable(await contract.methods.realBalanceOf(address).call());
    let accountReward = getHumanReadable(await contract.methods.getReward(address).call());

    let balanceWithReward = ((new BN(realBalance)).add(new BN(accountReward))).toString();

    let finalResult = {
        address,
        realBalance,
        accountReward,
        balanceWithReward
    };

    return finalResult;
}


function getHumanReadable(amount){
    return  (new BN(amount)).div(exponent).toString();
}


//getAccountInfo("0x0551cf305e9fcc39a448c035a2fb665cca40b627")