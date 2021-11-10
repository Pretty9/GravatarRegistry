const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
const ABI = [{"inputs":[{"internalType":"string","name":"defaultDisplayName","type":"string"},{"internalType":"string","name":"defaultImageHash","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"displayName","type":"string"},{"indexed":false,"internalType":"string","name":"imageHash","type":"string"}],"name":"NewGravatar","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"displayName","type":"string"},{"indexed":false,"internalType":"string","name":"imageHash","type":"string"}],"name":"UpdatedGravatar","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"gravatarToOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"gravatars","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"displayName","type":"string"},{"internalType":"string","name":"imageHash","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ownerToGravatar","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"string","name":"_displayName","type":"string"},{"internalType":"string","name":"_imageHash","type":"string"}],"name":"createGravatar","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getGravatar","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getOthersGravatar","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"string","name":"_displayName","type":"string"}],"name":"updateGravatarName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_imageHash","type":"string"}],"name":"updateGravatarImage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_displayName","type":"string"},{"internalType":"string","name":"_imageHash","type":"string"}],"name":"setMythicalGravatar","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const contract = new web3.eth.Contract(ABI, '0x45920BA536D82A3f4f4C649F1F5CA04238a72D6C');

document.querySelector('#load').onclick = () => {
    let cnt = 0;

    document.querySelector('#status').innerHTML = 'loading...';
    const interval = setInterval(() => {
        cnt += 1;
        document.querySelector('#time').innerHTML = `${cnt}s`;
    }, 1000);

    const address = document.querySelector('#address').value;
    contract.methods.getGravatar().call({from: address}).then((result) => {
        document.querySelector('#status').innerHTML = 'loading image...';
        document.querySelector('#gravatar').onload = () => {
            document.querySelector('#status').innerHTML = 'success';
            clearInterval(interval);
        }
        document.querySelector('#gravatar').src = `https://dweb.link/ipfs/${result['1']}`;

        document.querySelector('#name').innerHTML = result['0'];
    })
}