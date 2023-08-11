// สร้างไฟล์ account.json แล้วใส่ []

const fs = require('fs');
const readline = require('readline')
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Key = webdriver.Key

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const info = {
    day: '01',
    month: 'Jan',
    year: '2005',
    sex: 'MaleButton'
}

function generate(length) {
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

async function register() {

    try {

    var driver = await new webdriver.Builder().forBrowser('chrome').build();

    var name = generate(6);
    var password = generate(12);
    
    await driver.get('https://roblox.com');

    var Month = await driver.findElement(By.id('MonthDropdown'))
    Month.sendKeys(info.month);

    var Day = await driver.findElement(By.id('DayDropdown'))
    Day.sendKeys(info.day)

    var Year = await driver.findElement(By.id('YearDropdown'))
    Year.sendKeys(info.year)
    
    var username_slot = await driver.findElement(By.id('signup-username'))
    username_slot.sendKeys(name)

    var password_slot = await driver.findElement(By.id('signup-password'))
    password_slot.sendKeys(password)

    var sex = await driver.findElement(By.id(info.sex))
    sex.click()

    var signup = await driver.findElement(By.id('signup-button'))
    signup.click()

    } catch(e) {
        console.error('error ', e)
    } finally {

    let user = {
        name: name,
        password: password
    };

    fs.readFile('./account.json', 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
    
            const databases = JSON.parse(data);
    
            databases.push(user);
    
            fs.writeFile('./account.json', JSON.stringify(databases, null, 4), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
        }
    
    });
    }
};

rl.question('[\033[36m+\033[37m] Amount : ', amount => {
    for (i = 0; i < Number(amount); i++) {
        register()
    }
})
