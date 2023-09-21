const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function searchLinkedinProfiles(name) {
  const options = new chrome.Options(); //headess
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.google.com');
    await driver
      .findElement(By.name('q'))
      .sendKeys(`${name} linkedin profiles`, Key.RETURN);

    const profiles = [];
    await driver.wait(
      until.elementLocated(
        By.xpath(
          '/html/body/div[5]/div/div[10]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/div/span/a'
        )
      ),
      15000
    );
    // Find all elements that match the criteria (name in title and Instagram address)
    const elements = await driver.findElements(
      By.xpath(
        '/html/body/div[5]/div/div[10]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/div/span/a'
      )
    );
    console.log(elements.length);
    for (const element of elements) {
      const title = await element.getText();
      console.log(title);
      if (title.includes('profiles')) {
        await element.click();

        await driver.wait(
          until.elementLocated(By.xpath('/html/body/div/footer')),
          10000
        );
        profileImages = await driver.findElements(
          By.xpath('//ul/li/a/div//h3')
        );
        profileCount = profileImages.length;
        console.log(profileCount);
        await driver.sleep(1000);
        for (let p = 1; p < profileCount; p++) {
          profileImg2 = await driver.findElement(
            By.xpath(`(//ul/li/a/div[1]/img)[${p}]`)
          );
          await driver.executeScript(
            'arguments[0].scrollIntoView();',
            profileImg2
          );
          console.log(p);
          let profileImg = '';
          let fullname = '';
          let title = '';
          let location = '';
          let experience = '';
          let education = '';

          try {
            profileImg = await driver
              .findElement(By.xpath(`(//ul/li/a/div[1]/img)[${p}]`))
              .getAttribute('src');
          } catch (error) {
            console.log('Profile image not found for this profile.');
          }
          try {
            fullname = await driver
              .findElement(By.xpath(`(//ul/li/a//h3)[${p}]`))
              .getText();
          } catch (error) {
            console.log('Full name not found for this profile.');
          }
          try {
            title = await driver
              .findElement(By.xpath(`(//ul/li/a//h4)[${p}]`))
              .getText();
          } catch (error) {
            console.log('Title not found for this profile.');
          }
          try {
            location = await driver
              .findElement(By.xpath(`(//ul/li/a//p)[${p}]`))
              .getText();
          } catch (error) {
            console.log('Location not found for this profile.');
          }
          try {
            education = await driver
              .findElement(
                By.xpath(
                  `(//ul/li/a/div[2]/div/div[1]//*[@id="school-icon"]/../../span)[${p}]`
                )
              )
              .getText();
          } catch (error) {
            console.log('Education not found for this profile.');
          }
          try {
            experience = await driver
              .findElement(
                By.xpath(
                  `(//ul/li/a/div[2]/div/div[1]//*[@id="briefcase-icon"]/../../span)[${p}]`
                )
              )
              .getText();
          } catch (error) {
            console.log('Experience not found for this profile.');
          }

          profiles.push({
            fullname,
            title,
            location,
            experience,
            education,
            profileImg,
          });
        }
        console.log(profiles);
        return profiles;
      }
    }
  } catch (error) {
    console.error('Error during the search:', error);
    return profiles;

  } finally {
    await driver.quit();
  }
}

async function searchInstagramProfiles(name) {
  const options = new chrome.Options(); //headess
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.google.com');
    await driver
      .findElement(By.name('q'))
      .sendKeys(`${name} profiles instagram`, Key.RETURN);

    // Initialize an array to store profile information
    const profiles = [];
    await driver.wait(
      until.elementLocated(
        By.xpath(
          '/html/body/div[5]/div/div[10]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/div/span/a'
        )
      ),
      10000
    );
    // Find all elements that match the criteria (name in title and Instagram address)
    const elements = await driver.findElements(
      By.xpath(
        '/html/body/div[5]/div/div[10]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/div/span/a'
      )
    );
    console.log(elements.length);

    for (const element of elements) {
      // Get the title and link attributes
      const title = await element.getText();
      const link = await element.getAttribute('href');
      // Check if the link includes 'https://www.instagram.com' and the title includes the name
      if (link.includes('https://www.instagram.com')) {
        console.log(title);

        await driver.wait(
          until.elementLocated(
            By.xpath(
              '/html/body/div[5]/div/div[10]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/div/span/a'
            )
          ),
          10000
        );
        // Click on the element
        await element.click();

        // Wait for the search results to load, and then find and click the Instagram link.
        // await driver.wait(until.elementLocated(By.partialLinkText('Instagram')), 5000);
        // const instagramLink = await driver.findElement(By.partialLinkText('Instagram'));
        // await instagramLink.click();

        let username = '';
        let fullname = '';
        let posts = '';
        let followers = '';
        let followings = '';
        let bio = '';
        let profileImg = '';

        try {
          username = await driver
            .wait(
              until.elementLocated(By.xpath('//header//section//div//h2')),
              10000
            )
            .getText();
        } catch (error) {
          console.log('Username not found for this profile.');
        }

        try {
          fullname = await driver
            .findElement(By.xpath('//header//section//div[3]/div[1]'))
            .getText();
        } catch (error) {
          console.log('Full name not found for this profile.');
        }

        try {
          posts = await driver
            .findElement(By.xpath('//header//section//ul//li[1]'))
            .getText();
        } catch (error) {
          console.log('Number of posts not found for this profile.');
        }

        try {
          followers = await driver
            .findElement(By.xpath('//header//section//ul//li[2]'))
            .getText();
        } catch (error) {
          console.log('Number of followers not found for this profile.');
        }

        try {
          followings = await driver
            .findElement(By.xpath('//header//section//ul//li[3]'))
            .getText();
        } catch (error) {
          console.log('Number of followings not found for this profile.');
        }

        try {
          bio = await driver
            .findElement(By.xpath('//header//section//div[3]/h1'))
            .getText();
        } catch (error) {
          console.log('Bio not found for this profile.');
        }

        try {
          profileImg = await driver
            .findElement(By.xpath('//header//img'))
            .getAttribute('src');
        } catch (error) {
          console.log('Profile image not found for this profile.');
        }

        let isHidden = false; // Initialize isItHidden as false
        try {
          await driver.findElement(By.xpath('//article//div//div//h2'));
          isHidden = true;
        } catch (error) {
          // Handle the case where the profile is not hidden
          console.log('This profile is not hidden.');
        }

        // Add the information to the profiles array
        profiles.push({
          username,
          posts,
          followers,
          followings,
          bio,
          isHidden,
          fullname,
          profileImg,
        });

        // Navigate back to the previous page (if needed)
        await driver.navigate().back();
      }
    }
    console.log(profiles);

    return profiles;
  } finally {
    await driver.quit();
  }
}

module.exports = { searchInstagramProfiles, searchLinkedinProfiles };
