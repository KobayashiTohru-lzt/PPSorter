const fs = require('fs');
const extra = require('fs-extra');
const folder = './logs';
const resultsFolder = './results';

(async() => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
        console.log(` \nПапка для логов была создана, поместите логи в директорию ${folder}, после чего перезапустите скрипт\n`);
        return;
    }
    
    if (!fs.existsSync(resultsFolder)) {
        fs.mkdirSync(resultsFolder);
    }
    
    console.log(`\n Tohru LolzTeam\n Обработка Paypal: https://lolz.guru/threads/3847981/\n`);

    const logs = fs.readdirSync(folder);
    
    for (let log of logs) {
        try {
            let paypalEntriesCount = 0;
    
            for (let cookieFile of fs.readdirSync(folder + "/" + log + "/Cookies")) {
                const entries = fs.readFileSync(folder + "/" + log + "/Cookies/" + cookieFile, 'utf-8').split("\n").filter(e => e.startsWith(".paypal.com"));
    
                if (!entries.length) continue;
    
                for (let entrie of entries) {
                    if (!entrie.length) continue;
                    paypalEntriesCount++;
                }
            }

            if (paypalEntriesCount > 0) {
                extra.copySync(folder + "/" + log, `./results/${log}`);
                console.log(` Сохранён лог ${log}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    console.log(`\n Сохранение завершено, лучшая обработка PayPal тут: https://lolz.guru/threads/3847981/\n`);
})();