const GravatarRegistry = artifacts.require("GravatarRegistry");

contract('GravatarRegistry Test', accounts => {
    it('Owner Test', () => {
        return GravatarRegistry.deployed().then(async(instance) => {
            const owner = await instance.owner();
            assert.equal(owner, accounts[0]);
        });
    });

    it('Unknown Test', () => {
        return GravatarRegistry.deployed().then(async(instance) => {
            const result = await instance.getGravatar();
            assert.equal(result['0'], 'Unknown');
            assert.equal(result['1'], 'QmT4D2Z1Pams5ADvnaPPAxiWETfKWiizA7rMisgeNZTL9k');
        });
    });

    it('Update before create Test', () => {
        return GravatarRegistry.deployed().then(async(instance) => {
            await instance.updateGravatarName('Bob');
        });
    });

    it('Create Gravatar Test', () => {
        return GravatarRegistry.deployed().then(async(instance) => {
            const result = await instance.createGravatar('nico', 'QmPB6bfnhRiLMQ25f2T42zLWB6oLvrTqLvg1QRWcvuAD83');
            console.log(result.logs[0].args);
        });
    });

    it('Known Test 1', () => {
        return GravatarRegistry.deployed().then(async(instance) => {
            const result = await instance.getGravatar();
            assert.equal(result['0'], 'nico');
            assert.equal(result['1'], 'QmPB6bfnhRiLMQ25f2T42zLWB6oLvrTqLvg1QRWcvuAD83');
        });
    });

    it('Update after create Test', () => {
        return GravatarRegistry.deployed().then(async(instance) => {
            await instance.updateGravatarName('niconi');
        });
    });

    it('Known Test 2', () => {
        return GravatarRegistry.deployed().then(async(instance) => {
            const result = await instance.getGravatar();
            assert.equal(result['0'], 'niconi');
            assert.equal(result['1'], 'QmPB6bfnhRiLMQ25f2T42zLWB6oLvrTqLvg1QRWcvuAD83');
        });
    });

});